import type { Country } from '../types/country.js';

export function mapCountryResponse(data: Record<string, unknown>): Country {
  const languages = data.languages as { name: string }[];

  const currencies = data.currencies as
    { code: string; name: string }[] | undefined;

  return {
    name: data.name as string,
    capital: data.capital as string,
    region: data.region as string,
    population: data.population as number,
    flag: data.flag as string,
    languages: languages.map((language) => language.name),

    area: data.area as number | undefined,

    borders: data.borders as string[] | undefined,

    currencies: currencies?.map(
      (currency) => `${currency.name} (${currency.code})`,
    ),
  };
}
