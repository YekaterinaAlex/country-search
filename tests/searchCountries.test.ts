import { afterEach, describe, expect, it, vi } from 'vitest';
import { searchCountries } from '../src/api/searchCountries.js';

describe('searchCountries', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch countries by name', async () => {
    const countries = [{ name: 'Germany' }];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => countries,
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    const result = await searchCountries('germany', controller.signal);

    expect(result).toEqual(countries);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://countries.dev/name/germany',
      expect.objectContaining({
        signal: controller.signal,
      }),
    );
  });

  it('should throw an error when response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    await expect(searchCountries('germany', controller.signal)).rejects.toThrow(
      'HTTP error: 500',
    );
  });

  it('should return an empty array for HTTP 404', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    const result = await searchCountries('unknown', controller.signal);

    expect(result).toEqual([]);
  });
});
