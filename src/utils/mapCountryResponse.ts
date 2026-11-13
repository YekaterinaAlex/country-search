import type { Country } from '../types/country.js';

export function mapCountryResponse(data: Record<string, unknown>): Country {
  return {
    name: data.name as string,
    capital: data.capital as string,
    population: data.population as number,
    flag: data.flag as string,
  };
}
