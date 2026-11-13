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

  it('should map region and languages', () => {
    const apiCountry = {
      name: 'Germany',
      capital: 'Berlin',
      region: 'Europe',
      population: 83240525,
      flag: '🇩🇪',
      languages: [
        {
          name: 'German',
          nativeName: 'Deutsch',
        },
      ],
    };

    const result = mapCountryResponse(apiCountry);

    expect(result.region).toBe('Europe');
    expect(result.languages).toEqual(['German']);
  });
});
