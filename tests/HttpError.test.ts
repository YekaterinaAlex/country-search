import { describe, expect, it } from 'vitest';
import { HttpError } from '../src/api/HttpError.js';

describe('HttpError', () => {
  it('should store HTTP status', () => {
    const error = new HttpError(500);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('HttpError');
    expect(error.status).toBe(500);
    expect(error.message).toBe('HTTP error: 500');
  });
});
