import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
export default function fetchCountries(country) {
  return fetch(`${BASE_URL}${country}`).then(result => {
    if (!result.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return result.json();
  });
}
