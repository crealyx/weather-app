import './main.scss';

// HMR
if (module.hot) {
  module.hot.accept();
}
//

const key = process.env.API_KEY;

// DOM Selectors
const loadIcon = document.querySelector('.lds-facebook');
const cityName = document.querySelector('.city');
const cityTemp = document.querySelector('.temp');
const cityInput = document.querySelector('.city-input');
const tempSwitch = document.querySelector('.switch');
const cityButton = document.querySelector('.search');
const cityWeather = document.querySelector('.weather');
const weatherIcon = document.querySelector('img');
const cityContainer = document.querySelector('.city-container');
const errorMsg = document.querySelector('.error');

// Sends request to openweather api
const getCity = async (city) => {
  const base = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `?q=${city}&units=metric&appid=${key}`;

  // Display loading icon while getting data
  cityContainer.style.display = 'none';
  loadIcon.style.display = 'inline-block';

  const response = await fetch(base + query);

  // Remove loading icon
  cityContainer.style.display = 'flex';
  loadIcon.style.display = 'none';

  if (response.status !== 200) {
    throw new Error(`can't fetch`);
  }
  const data = await response.json();
  return [data.name, data.main.temp, data.weather[0]];
};

// Search with enter key
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchCity();
  }
});

// Search by clicking search button
cityButton.addEventListener('click', (e) => {
  e.preventDefault();
  searchCity();
});

// Switch between fahrenheit and celcius units
tempSwitch.addEventListener('click', (e) => {
  const temp = cityTemp.textContent.split(' ');
  const tempInt = parseInt(temp[0], 10);
  if (e.target.textContent === 'Change to °F') {
    cityTemp.textContent = `${Math.round((tempInt * 9) / 5 + 32)} °F`;
    e.target.textContent = 'Change to °C';
  } else {
    cityTemp.textContent = `${Math.round((tempInt - 32) * (5 / 9))} °C`;
    e.target.textContent = 'Change to °F';
  }
});

//
function searchCity() {
  const city = cityInput.value;
  getCity(city)
    .then((data) => {
      errorMsg.style.display = 'none';
      showCityContents();
      cityName.style.color = 'white';
      cityName.style.fontSize = '2.2rem';

      cityContainer.style.display = 'flex';
      cityName.textContent = `${data[0]}`;
      cityTemp.textContent = `${Math.ceil(data[1])} °C`;
      cityWeather.textContent = `${data[2].main}`;
      weatherIcon.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${data[2].icon}@2x.png`
      );
    })
    .catch(() => {
      hideCityContents();
      errorMsg.style.display = 'block';
    });
}

function hideCityContents() {
  cityName.style.display = 'none';
  cityTemp.style.display = 'none';
  cityWeather.style.display = 'none';
  weatherIcon.style.display = 'none';
  cityContainer.style.borderBottom = 'none';
}

function showCityContents() {
  cityName.style.display = 'block';
  cityTemp.style.display = 'block';
  cityWeather.style.display = 'block';
  weatherIcon.style.display = 'block';
  cityContainer.style.borderBottom = '2px solid white';
}
