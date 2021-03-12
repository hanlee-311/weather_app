var lat = 33.44;
var lon = -94.04;
var weatherApiBase = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon  + "&units=imperial" + "&appid=f692887ab5a79b9ba5e8c4d601ee3738";

var cityDisplayEl = document.getElementById('city');
var tempDisplayEl = document.getElementById('temp');
var humidityDisplayEl = document.getElementById('humidity');
var windDisplayEl = document.getElementById('wind');
var uvDisplayEl = document.getElementById('UV');
var cityInputEl = document.getElementById('input_text');
var searchBtn = document.getElementById('search');

fetch(weatherApiBase)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    
    var weatherInfo = [data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi, data.timezone];

    displayWeatherInfo(weatherInfo);
});

function displayWeatherInfo (weatherInfo) {
    tempDisplayEl.textContent = weatherInfo[0];
    humidityDisplayEl.textContent = weatherInfo[1];
    windDisplayEl.textContent = weatherInfo[2];
    uvDisplayEl.textContent = weatherInfo[3];
    cityDisplayEl.textContent = weatherInfo[4];

    if (weatherInfo[3] < 3) {
        uvDisplayEl.classList.add('favorable');
    }

    if (weatherInfo[3] > 3 && weatherInfo[3] < 8) {
        uvDisplayEl.classList.add('moderate');
    }

    if (weatherInfo[3] > 8) {
        uvDisplayEl.classList.add('severe');
    }
};

function searchCityInput () {
    var cityInput = cityInputEl.value.trim();
    console.log(cityInput);
}

//Search button listener
searchBtn.addEventListener('click', searchCityInput);