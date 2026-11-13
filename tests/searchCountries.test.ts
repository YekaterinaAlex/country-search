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
      {
        signal: expect.any(AbortSignal),
      },
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

  it('should pass a combined AbortSignal to fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    });

    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();

    await searchCountries('germany', controller.signal);

    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const combinedSignal = options.signal;

    expect(combinedSignal).toBeInstanceOf(AbortSignal);
    expect(combinedSignal?.aborted).toBe(false);

    controller.abort();

    expect(combinedSignal?.aborted).toBe(true);
  });

  it('should reject with AbortError when request is aborted', async () => {
    const controller = new AbortController();

    const fetchMock = vi.fn().mockImplementation(
      (_url: string, options: RequestInit) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }),
    );

    vi.stubGlobal('fetch', fetchMock);

    const promise = searchCountries('germany', controller.signal);

    controller.abort();

    await expect(promise).rejects.toMatchObject({
      name: 'AbortError',
    });
  });

  it('should create a timeout signal', async () => {
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    try {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
      });

      vi.stubGlobal('fetch', fetchMock);

      const controller = new AbortController();

      await searchCountries('germany', controller.signal);

      expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Number));
    } finally {
      timeoutSpy.mockRestore();
    }
  });

  it('should reject with TimeoutError when request times out', async () => {
    const timeoutController = new AbortController();

    const timeoutSpy = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(timeoutController.signal);

    try {
      const fetchMock = vi.fn().mockImplementation(
        (_url: string, options: RequestInit) =>
          new Promise((_resolve, reject) => {
            options.signal?.addEventListener('abort', () => {
              reject(options.signal?.reason);
            });
          }),
      );

      vi.stubGlobal('fetch', fetchMock);

      const controller = new AbortController();
      const promise = searchCountries('germany', controller.signal);

      timeoutController.abort(
        new DOMException('Request timed out', 'TimeoutError'),
      );

      await expect(promise).rejects.toMatchObject({
        name: 'TimeoutError',
      });
    } finally {
      timeoutSpy.mockRestore();
    }
  });
});
