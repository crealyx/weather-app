import './main.scss';

// HMR
if (module.hot) {
  module.hot.accept();
}
//

const key = '7bd917a3466d4b7e906413b546a10499';

let cityName = document.querySelector('.city');
let cityTemp = document.querySelector('.temp');
let cityInput = document.querySelector('.city-input');
let cityButton = document.querySelector('.search');

const getCity = async (city) => {
  const base = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `?q=${city}&units=metric&appid=${key}`;

  const response = await fetch(base + query);

  if (response.status !== 200) {
    throw new Error(`can't fetch`);
  }
  const data = await response.json();
  console.log(data);
  return [data.name, data.main.temp];
};

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchCity();
  }
});
cityButton.addEventListener('click', (e) => {
  e.preventDefault();
  searchCity();
});

function searchCity() {
  const city = cityInput.value;
  getCity(city)
    .then((data) => {
      cityName.textContent = `${data[0]}`;
      cityTemp.textContent = `${Math.ceil(data[1])} c`;
    })
    .catch((err) => (cityTemp.textContent = `Please enter proper city name`));
}
