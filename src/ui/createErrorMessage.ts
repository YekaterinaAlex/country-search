export function createErrorMessage(
  message: string,
  onRetry: () => void,
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'error-message';

  const text = document.createElement('p');
  text.textContent = message;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Try again';

  button.addEventListener('click', onRetry);

  container.append(text, button);

  return container;
}
