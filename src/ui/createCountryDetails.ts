import type { Country } from '../types/country.js';

export function createCountryDetails(country: Country): HTMLElement {
  const details = document.createElement('section');
  details.className = 'country-details-panel';

  const title = document.createElement('h2');
  title.textContent = `${country.flag} ${country.name}`;

  const description = document.createElement('p');
  description.textContent =
    `${country.name} is a country in ${country.region}. ` +
    `Its capital is ${country.capital}.`;

  const area = document.createElement('p');
  area.textContent = `Area: ${
    country.area?.toLocaleString('en-US') ?? 'N/A'
  } km²`;

  const borders = document.createElement('p');
  borders.textContent = `Borders: ${country.borders?.join(', ') || 'N/A'}`;

  const languages = document.createElement('p');
  languages.textContent = `Languages: ${country.languages.join(', ') || 'N/A'}`;

  const currencies = document.createElement('p');
  currencies.textContent = `Currencies: ${country.currencies?.join(', ') || 'N/A'}`;

  details.append(title, description, area, borders, languages, currencies);

  return details;
}
