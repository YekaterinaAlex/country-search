import { HttpError } from './HttpError.js';

export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<unknown> {
  const timeoutSignal = AbortSignal.timeout(5000);

  const combinedSignal = AbortSignal.any([signal, timeoutSignal]);
  const response = await fetch(
    `https://countries.dev/name/${encodeURIComponent(query)}`,
    { signal: combinedSignal },
  );
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new HttpError(response.status);
  }
  return response.json();
}
