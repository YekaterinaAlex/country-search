/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { createCountryCard } from '../src/ui/createCountryCard.js';
import type { Country } from '../src/types/country.js';

describe('createCountryCard', () => {
  it('should create a card with country name', () => {
    const country: Country = {
      name: 'Germany',
      capital: 'Berlin',
      region: 'Europe',
      population: 83200000,
      flag: '🇩🇪',
      languages: ['German'],
    };

    const card = createCountryCard(country);

    expect(card.tagName).toBe('ARTICLE');
    expect(card.classList.contains('country-card')).toBe(true);
    expect(card.querySelector('h2')?.textContent).toBe('Germany');
  });
});
