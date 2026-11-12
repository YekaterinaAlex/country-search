import { afterEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../src/utils/debounce.js';

describe('debounce', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not call callback immediately', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();

    expect(callback).not.toHaveBeenCalled();
  });
});
