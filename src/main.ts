import { debounce } from './utils/debounce.js';
import { searchCountries } from './api/searchCountries.js';
import { mapCountryResponse } from './utils/mapCountryResponse.js';
import { createCountryCard } from './ui/createCountryCard.js';
import { createErrorMessage } from './ui/createErrorMessage.js';
import { createCountryDetails } from './ui/createCountryDetails.js';

const app = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Country Search';

const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search for a country...';
searchInput.setAttribute('aria-label', 'Search countries');

let currentController: AbortController | null = null;

const performSearch = async () => {
  const query = searchInput.value.trim();

  if (!query) {
    results.replaceChildren();
    return;
  }

  const controller = new AbortController();
  currentController = controller;

  results.replaceChildren();

  const loading = document.createElement('p');
  loading.textContent = 'Loading...';

  results.append(loading);
  try {
    const data = await searchCountries(query, controller.signal);
    if (controller.signal.aborted) {
      return;
    }
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response');
    }

    const countries = data.map((item: unknown) => {
      if (typeof item !== 'object' || item === null) {
        throw new Error('Invalid country data');
      }

      return mapCountryResponse(item as Record<string, unknown>);
    });

    results.replaceChildren();

    if (countries.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'No countries found';

      results.append(message);
      return;
    }

    countries.forEach((country) => {
      const card = createCountryCard(country);

      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Show details for ${country.name}`);

      const cards: HTMLElement[] = [];
      const showDetails = () => {
        const details = createCountryDetails(country);

        const backButton = document.createElement('button');
        backButton.type = 'button';
        backButton.textContent = '← Back to results';
        backButton.className = 'back-button';

        backButton.addEventListener('click', () => {
          results.replaceChildren(...cards);
        });

        results.replaceChildren(backButton, details);
      };

      card.addEventListener('click', showDetails);

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showDetails();
        }
      });
      cards.push(card);
      results.append(card);
    });
  } catch (error) {
    if (controller.signal.aborted) {
      return;
    }

    console.error('Search failed:', error);

    results.replaceChildren();

    const errorText =
      error instanceof Error && error.name === 'TimeoutError'
        ? 'Request timed out. Please try again.'
        : 'Something went wrong. Please try again.';

    const errorElement = createErrorMessage(errorText, () => {
      void performSearch();
    });

    results.append(errorElement);
  }
};

const handleSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', () => {
  currentController?.abort();

  handleSearch();
});

const results = document.createElement('section');
results.id = 'results';
results.setAttribute('aria-live', 'polite');

app.append(title, searchInput, results);
document.body.append(app);
