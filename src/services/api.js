const API_BASE_URL = "http://127.0.0.1:8001";

export async function sendMessage(question) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

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

  if (response.status === 401) {
    throw new Error("Your login session is invalid or expired.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || `Server error: ${response.status}`
    );
  }

  return await response.json();
}