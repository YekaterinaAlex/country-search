import { debounce } from './utils/debounce.js';
import { searchCountries } from './api/searchCountries.js';
import { mapCountryResponse } from './utils/mapCountryResponse.js';
import { createCountryCard } from './ui/createCountryCard.js';

const app = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Country Search';

const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search for a country...';
searchInput.setAttribute('aria-label', 'Search countries');

let currentController: AbortController | null = null;

const handleSearch = debounce(async () => {
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
      results.append(card);
    });
  } catch (error) {
    if (controller.signal.aborted) {
      return;
    }

    console.error('Search failed:', error);

    results.replaceChildren();

    const message = document.createElement('p');

    if (error instanceof Error && error.name === 'TimeoutError') {
      message.textContent = 'Request timed out. Please try again.';
    } else {
      message.textContent = 'Something went wrong. Please try again.';
    }

    results.append(message);
  }
}, 300);

searchInput.addEventListener('input', () => {
  currentController?.abort();

  handleSearch();
});

const results = document.createElement('section');
results.id = 'results';
results.setAttribute('aria-live', 'polite');

app.append(title, searchInput, results);
document.body.append(app);
