/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';
import { createCountryDetails } from '../src/ui/createCountryDetails.js';
import type { Country } from '../src/types/country.js';

describe('createCountryDetails', () => {
  it('should display detailed country information', () => {
    const country: Country = {
      name: 'Germany',
      capital: 'Berlin',
      region: 'Europe',
      population: 83200000,
      flag: '🇩🇪',
      languages: ['German'],
      area: 357114,
      borders: ['AUT', 'FRA', 'POL'],
      currencies: ['Euro (EUR)'],
    };

    const details = createCountryDetails(country);

    expect(details.textContent).toContain('Germany');
    expect(details.textContent).toContain('357,114');
    expect(details.textContent).toContain('AUT');
    expect(details.textContent).toContain('German');
    expect(details.textContent).toContain('Euro (EUR)');
  });
});
