import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './commponents/fetchCountries';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

search.addEventListener('input', debounce(onSerchInput, DEBOUNCE_DELAY));

function onSerchInput(evt) {
  fetchCountries(search.value)
    .then(countries => {
      if (countries.length > 1) {
        createMarkupCountryList(countries);
      } else {
        createMarkupOneCountry(countries[0]);
      }
    })
    .catch(err => console.log(err));
}

function createMarkupCountryList(countries) {
  countryList.innerHTML = countries
    .map(
      country =>
        `<li><img src="${country.flags.svg}" alt="flag of country" width="30"><p>${country.name.official}</p></li>`
    )
    .join('');
}

function createMarkupOneCountry(country) {
  const languages = Object.values(country.languages).reduce(
    (acc, language, i, arr) => {
      if (i === arr.length - 1) {
        return acc + language;
      }
      return acc + language + ', ';
    },
    ''
  );
  console.log(languages);

  countryList.innerHTML = `
  <li>
    <img src="${country.flags.svg}" alt="flag of country" width="60">
    <h2>${country.name.official}</h2>
    <p><b>Capital: </b>${country.capital}</p>
    <p><b>Population: </b>${country.population}</p><p>
    <b>Languages: </b>${languages}</p>
  </li>`;
}
