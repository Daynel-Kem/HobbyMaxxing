const API_BASE_URL = "http://localhost:5001";

export async function saveUserProfile(payload) {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getRecommendations(userId) {
  const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}

export async function getClasses() {
  const response = await fetch(`${API_BASE_URL}/api/classes`);
  return response.json();
}

export async function createClass(payload) {
  const response = await fetch(`${API_BASE_URL}/api/classes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}