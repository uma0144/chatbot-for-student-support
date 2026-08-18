import { API_BASE_URL } from "../config";
import { notifyUnauthorized } from "./session";

function authHeaders(contentType = "application/json") {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Session expired. Please log out and sign in again.");
  }
  const headers = { Authorization: `Bearer ${token}` };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  return headers;
}

async function parseErrorResponse(response) {
  const errorText = await response.text();
  let message = `Server error (${response.status})`;
  try {
    const errorData = JSON.parse(errorText);
    if (response.status === 401) {
      notifyUnauthorized();
      message = "Session expired. Please log in again.";
    } else if (typeof errorData.detail === "string") {
      message = errorData.detail;
    }
  } catch {
    if (errorText) message = errorText;
  }
  return message;
}

export function fetchAdminStats() {
  return fetch(`${API_BASE_URL}/api/admin/stats`, {
    headers: authHeaders(),
  }).then(async (response) => {
    if (!response.ok) throw new Error(await parseErrorResponse(response));
    return response.json();
  });
}

export function fetchAdminUsers() {
  return fetch(`${API_BASE_URL}/api/admin/users`, {
    headers: authHeaders(),
  }).then(async (response) => {
    if (!response.ok) throw new Error(await parseErrorResponse(response));
    return response.json();
  });
}

export async function uploadKnowledgePdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/admin/knowledge-base/pdf`, {
    method: "POST",
    headers: authHeaders(null),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }
  return response.json();
}
