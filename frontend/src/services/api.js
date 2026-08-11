import { API_BASE_URL } from "../config";

function chatErrorMessage(error) {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return (
      "Cannot reach the server. Is the backend running on port 8080? " +
      "Run: uv run uvicorn backend.main:app --host 127.0.0.1 --port 8080 --reload"
    );
  }
  return error?.message || "Something went wrong. Please try again.";
}

export async function sendMessage(question) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Session expired. Please log out and sign in again.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = `Server error (${response.status})`;
      try {
        const errorData = JSON.parse(errorText);
        if (response.status === 401) {
          message = "Session expired. Please log out and sign in again.";
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
      throw new Error(message);
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