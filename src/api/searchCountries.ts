export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<unknown> {
  const response = await fetch(
    `https://countries.dev/name/${encodeURIComponent(query)}`,
    { signal },
  );
  return response.json();
}
