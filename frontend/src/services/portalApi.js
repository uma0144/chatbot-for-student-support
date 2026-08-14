import { API_BASE_URL } from "../config";

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
      message = "Session expired. Please log out and sign in again.";
    } else if (typeof errorData.detail === "string") {
      message = errorData.detail;
    }
  } catch {
    if (errorText) message = errorText;
  }
  return message;
}

async function portalGet(path) {
  const response = await fetch(`${API_BASE_URL}/api/portal${path}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }
  return response.json();
}

async function portalPost(path, body) {
  const response = await fetch(`${API_BASE_URL}/api/portal${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }
  return response.json();
}

export function fetchKnowledgeTopics() {
  return portalGet("/knowledge-base");
}

export function fetchKnowledgeTopic(topicId) {
  return portalGet(`/knowledge-base/${topicId}`);
}

export function fetchFaqs() {
  return portalGet("/faqs");
}

export function fetchNotices() {
  return portalGet("/notices");
}

export function fetchTickets() {
  return portalGet("/tickets");
}

export function createTicket(subject, description) {
  return portalPost("/tickets", { subject, description });
}

export function fetchProfile() {
  return portalGet("/profile");
}
