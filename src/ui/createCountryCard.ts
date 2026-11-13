import type { Country } from '../types/country.js';

export function createCountryCard(country: Country): HTMLElement {
  const card = document.createElement('article');
  card.className = 'country-card';

  const flag = document.createElement('span');
  flag.className = 'country-flag';
  flag.textContent = country.flag;

  const name = document.createElement('h2');
  name.textContent = country.name;

  const details = document.createElement('div');
  details.className = 'country-details';

  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital}`;

  const region = document.createElement('p');
  region.textContent = `Region: ${country.region}`;

  const population = document.createElement('p');
  population.textContent = `Population: ${country.population.toLocaleString('en-US')}`;

  const languages = document.createElement('p');
  languages.textContent = `Languages: ${country.languages.join(', ')}`;

  details.append(name, capital, region, population, languages);
  card.append(flag, details);

  return card;
}
