const API_BASE_URL = 'http://localhost:5004';

export async function fetchNotes() {
  const response = await fetch(`${API_BASE_URL}/api/notes`);
  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }
  return response.json();
}
