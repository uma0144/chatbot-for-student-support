import { API_BASE_URL } from "../config";
import { notifyUnauthorized } from "./session";

function chatErrorMessage(error) {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return (
      "Cannot reach the server. Is the backend running on port 8080? " +
      "Run: uv run uvicorn backend.main:app --host 127.0.0.1 --port 8080 --reload"
    );
  }
  return error?.message || "Something went wrong. Please try again.";
}

function authHeaders() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Session expired. Please log out and sign in again.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseErrorResponse(response) {
  const errorText = await response.text();
  let message = `Server error (${response.status})`;
  try {
    const errorData = JSON.parse(errorText);
    if (response.status === 401) {
      notifyUnauthorized();
      message = "Session expired. Please log in again.";
    } else if (response.status === 422 && errorData.detail) {
      const detail = errorData.detail;
      if (Array.isArray(detail) && detail[0]?.type === "json_invalid") {
        message =
          "Invalid request format. In Swagger, keep the question on one line inside the JSON quotes.";
      } else if (Array.isArray(detail)) {
        message = detail.map((d) => d.msg || String(d)).join("; ");
      } else if (typeof detail === "string") {
        message = detail;
      }
    } else if (typeof errorData.detail === "string") {
      message = errorData.detail;
    }
  } catch {
    if (errorText) message = errorText;
  }
  return message;
}

export async function sendMessage(question) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        question: question,
      }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorResponse(response));
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(chatErrorMessage(error));
  }
}

/**
 * Stream a chat response token-by-token (ChatGPT-style).
 */
export async function sendMessageStream(question, { onToken, onReplace, onDone, onError } = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorResponse(response));
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Streaming is not supported in this browser.");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() || "";

      for (const part of parts) {
        const line = part.trim();
        if (!line.startsWith("data:")) continue;

        let payload;
        try {
          payload = JSON.parse(line.slice(5).trim());
        } catch {
          continue;
        }

        if (payload.type === "token" && payload.content) {
          onToken?.(payload.content);
        } else if (payload.type === "replace" && payload.content) {
          onReplace?.(payload.content);
        } else if (payload.type === "done") {
          onDone?.(payload.answer ?? "");
        } else if (payload.type === "error") {
          throw new Error(payload.detail || "Streaming failed.");
        }
      }
    }
  } catch (error) {
    console.error("Stream API Error:", error);
    if (error instanceof Error) {
      onError?.(error);
      throw error;
    }
    const wrapped = new Error(chatErrorMessage(error));
    onError?.(wrapped);
    throw wrapped;
  }
}