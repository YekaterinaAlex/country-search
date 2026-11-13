import { describe, expect, it } from 'vitest';
import { mapCountryResponse } from '../src/utils/mapCountryResponse.js';

describe('mapCountryResponse', () => {
  it('should map API data to Country', () => {
    const apiCountry = {
      name: 'Germany',
      capital: 'Berlin',
      population: 83200000,
      flag: '🇩🇪',
      region: 'Europe',
      alpha2Code: 'DE',
    };

    const result = mapCountryResponse(apiCountry);

    expect(result).toEqual({
      name: 'Germany',
      capital: 'Berlin',
      population: 83200000,
      flag: '🇩🇪',
    });
  });
});
