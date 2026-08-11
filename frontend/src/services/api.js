import { API_BASE_URL } from "../config";

export async function sendMessage(question) {
  try {
    const token = localStorage.getItem("access_token");

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
        if (response.status === 422 && errorData.detail) {
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
    throw error;
  }
}