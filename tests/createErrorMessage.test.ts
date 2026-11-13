import { describe, expect, it, vi } from 'vitest';
import { createErrorMessage } from '../src/ui/createErrorMessage.js';

describe('createErrorMessage', () => {
  it('should create an error message with a Retry button', () => {
    const onRetry = vi.fn();

    const element = createErrorMessage(
      'Something went wrong. Please try again.',
      onRetry,
    );

    expect(element.textContent).toContain(
      'Something went wrong. Please try again.',
    );

    const button = element.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.textContent).toBe('Try again');

    button?.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
