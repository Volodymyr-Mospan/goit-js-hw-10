import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './commponents/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

search.addEventListener('input', debounce(onSerchInput, DEBOUNCE_DELAY));

function onSerchInput(evt) {
  switch (search.value.length) {
    case 0:
      return cleanCountryList();

    case 1:
      cleanCountryList();
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
  }

  fetchCountries(search.value)
    .then(countries => {
      if (countries.length > 1) {
        createMarkupCountryList(countries);
      } else {
        createMarkupOneCountry(countries[0]);
      }
    })
    .catch(err => {
      cleanCountryList();
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
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

  countryList.innerHTML = `
  <li>
    <img src="${country.flags.svg}" alt="flag of country" width="60">
    <h2>${country.name.official}</h2>
    <p><b>Capital: </b>${country.capital}</p>
    <p><b>Population: </b>${country.population}</p><p>
    <b>Languages: </b>${languages}</p>
  </li>`;
}

function cleanCountryList() {
  countryList.innerHTML = '';
}