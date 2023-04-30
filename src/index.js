import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

// fetchCountries('country')
//   .then(country => console.log(country))
//   .catch(error => console.log('error >>>', error));

const inputEl = document.querySelector('input');
inputEl.addEventListener('input', debounce(onCountryFn, DEBOUNCE_DELAY));

function onCountryFn(e) {
  const countryName = e.target.value.trim();
  fetchCountries(countryName)
    .then(flagsObj => {
      createCountryList(flagsObj);
    })

    .catch(error => console.log('error >>>', error));
}
const list = document.querySelector('.country-list');
const createElLi = ({ capital, population, languages, flags, name }) => `
    <li><div class=country-flag>
          <img src="${flags.svg}" alt="${flags.alt}" width=50 height=30>
          <h1>${name.official}</h1>
        </div>
        <p><b>Capital:</b> ${capital}</b>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
    </li>
    `;
const createDiv = ({ flags, name }) => `
    <li><div class=country-flag>
          <img src="${flags.svg}" alt="${flags.alt}" width=50 height=30>
          <h1>${name.official}</h1>
        </div>
    </li>    `;
const createCountryList = array => {
  list.innerHTML = '';

  list.insertAdjacentHTML(
    'afterbegin',
    array.reduce((acc, element, index) => {
      if (array.length > 1 && array.length < 10) {
        return acc + createDiv(element);
      }
      if (array.length === 1) {
        return createElLi(element);
      } else {
        return '';
      }
    }, '')
  );
  if (array.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
};
