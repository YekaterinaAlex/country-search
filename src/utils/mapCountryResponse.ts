import type { Country } from '../types/country.js';

export function mapCountryResponse(data: Record<string, unknown>): Country {
  const languages = data.languages as { name: string }[];

  return {
    name: data.name as string,
    capital: data.capital as string,
    region: data.region as string,
    population: data.population as number,
    flag: data.flag as string,
    languages: languages.map((language) => language.name),
  };
}
