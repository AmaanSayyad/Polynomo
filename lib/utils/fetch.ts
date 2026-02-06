/**
 * Parse response as JSON only if content-type is JSON.
 * Avoids "Unexpected token '<'" when the server returns HTML (e.g. 404/500).
 */
export async function parseJsonResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    await response.text(); // consume body
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
