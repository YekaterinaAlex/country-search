import { debounce } from './utils/debounce.js';

const app = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Country Search';

const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search for a country...';
searchInput.setAttribute('aria-label', 'Search countries');

const handleSearch = debounce(() => {
  console.log('Searching for:', searchInput.value);
}, 300);

searchInput.addEventListener('input', handleSearch);

const results = document.createElement('section');
results.id = 'results';
results.setAttribute('aria-live', 'polite');

const countryCard = document.createElement('article');
countryCard.className = 'country-card';

const flag = document.createElement('span');
flag.className = 'country-flag';
flag.textContent = '🇩🇪';

const countryName = document.createElement('h2');
countryName.textContent = 'Germany';

countryCard.append(flag, countryName);
results.append(countryCard);

app.append(title, searchInput, results);
document.body.append(app);
