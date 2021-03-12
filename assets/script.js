
var cityDisplayEl = document.getElementById('city');
var tempDisplayEl = document.getElementById('temp');
var humidityDisplayEl = document.getElementById('humidity');
var windDisplayEl = document.getElementById('wind');
var uvDisplayEl = document.getElementById('UV');
var cityInputEl = document.getElementById('input_text');
var searchBtn = document.getElementById('search');

function apiCall (cityApiBase) {
fetch(cityApiBase)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var cityName = data.name;

    var weatherApiBase = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon  + "&units=imperial" + "&appid=f692887ab5a79b9ba5e8c4d601ee3738";


   fetch(weatherApiBase)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var weatherInfo = [data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi, cityName];

        displayWeatherInfo(weatherInfo);
    });

})};

//Displays weather information for the user to see
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


//When user inputs city, calls for API information
function searchCityInput () {
    var cityInput = cityInputEl.value.trim();
    console.log(cityInput);

    if (isNaN(cityInput)) {
        console.log("true");
        var cityApiBase = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=f692887ab5a79b9ba5e8c4d601ee3738';
        apiCall(cityApiBase);
        
    } else {
        console.log("not a city");
        // $('.helper-text').attri('data-error')
        return;
    }
}

//Search button listener
searchBtn.addEventListener('click', searchCityInput);