import './css/styles.css';

const search = document.querySelector('#search-box');
console.log(search);

const DEBOUNCE_DELAY = 300;

search.addEventListener('input', onSerchInput);

function onSerchInput(evt) {
  console.log(search.value);
}

function fetchCountries(name) {
  console.log(name);
}
