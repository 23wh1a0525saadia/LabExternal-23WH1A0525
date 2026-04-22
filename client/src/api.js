const API_BASE_URL = 'http://localhost:5004';

export async function fetchNotes(page = 1, limit = 5) {
  const url = new URL(`${API_BASE_URL}/api/notes`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }
  return response.json(); // { data: [...], total }
}
