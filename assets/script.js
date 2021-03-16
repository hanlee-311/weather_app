var cityDisplayEl = document.getElementById('city');
var tempDisplayEl = document.getElementById('temp');
var humidityDisplayEl = document.getElementById('humidity');
var windDisplayEl = document.getElementById('wind');
var uvDisplayEl = document.getElementById('UV');
var cityInputEl = document.getElementById('input_text');
var searchBtn = document.getElementById('search');
var forecastDisplayTemp = document.getElementById('forecast-temp');
var forecastDisplayHumidity = document.getElementById('forecast-humidity');
var searchCollection = document.getElementById('collection');

function apiCall (cityApiBase) {
fetch(cityApiBase)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var cityName = data.name;

    var weatherApiBase = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon  + "&units=imperial" + "&appid=f692887ab5a79b9ba5e8c4d601ee3738";

   fetch(weatherApiBase)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var weatherInfo = [data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi, cityName, data.current.weather[0].icon, data.current.dt];
        console.log(data);

        var forecastBox = document.getElementById('forecast-container');
        forecastBox.innerHTML = "";

        //Creates containers for the 5 day forecast
        for (var i = 1; i < 6 ; i++) {
            var date = moment.unix(data.daily[i].dt).format('M/D/YYYY');

            var card = document.createElement('div');
            card.setAttribute('class', 'card-panel teal col s2');

            var span = document.createElement('span');
            span.setAttribute('class', "white-text");

            var dateEl = document.createElement('p')
            dateEl.setAttribute('id', 'forecast-date');
            dateEl.textContent = date;

            var iconEl = document.createElement('img');
            var iconURL = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
            iconEl.setAttribute('src', iconURL);

            var tempEl = document.createElement('p');
            tempEl.setAttribute('id', 'forecast-temp');
            tempEl.textContent = "Temp: " + data.daily[i].temp.max + " ℉"; 

            var humidityEl = document.createElement('p')
            humidityEl.setAttribute('id', 'forecast-humidity')
            humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";

            span.appendChild(dateEl);
            span.appendChild(iconEl);
            span.appendChild(tempEl);
            span.appendChild(humidityEl);
            card.appendChild(span);
            forecastBox.appendChild(card);
        };

        displayWeatherInfo(weatherInfo);
    });

})};

//Displays weather information for the user to see
function displayWeatherInfo (weatherInfo) {
    document.querySelector('.today_date').classList.remove('hide');
    var iconURL = "http://openweathermap.org/img/w/" + weatherInfo[5] + ".png";
    var date = moment.unix(weatherInfo[6]).format('(M/D/YYYY)');

    tempDisplayEl.textContent = "Temperature: " + weatherInfo[0] + " ℉";
    humidityDisplayEl.textContent = "Humidity: " + weatherInfo[1] + "%";
    windDisplayEl.textContent = "Wind Speed: " + weatherInfo[2] + " MPH";
    uvDisplayEl.textContent ="UV Index: " + weatherInfo[3];
    cityDisplayEl.textContent = weatherInfo[4] + " " + date + " ";
    let iconImgTag = $("<img>");
    iconImgTag.attr("src", iconURL);
    cityDisplayEl.append(iconImgTag[0]);

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

    if (isNaN(cityInput)) {
        var cityApiBase = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=f692887ab5a79b9ba5e8c4d601ee3738';
        apiCall(cityApiBase);

        if (localStorage.getItem('city') == null) {
            var citySearches = [cityInput];
            localStorage.setItem('city', JSON.stringify(citySearches));
        } else {
            let savedCities = JSON.parse(localStorage.getItem("city"));

            if (savedCities.indexOf(cityInput) == -1) {
                savedCities.push(cityInput);
                localStorage.setItem("city", JSON.stringify(savedCities));
            };
        }

        renderCitySearch();

        cityInputEl.value = "";
        
    } else {
        console.log("not a city");
        // $('.helper-text').attri('data-error')
        return;
    }
}

//Renders users previous searches

function renderCitySearch () {
    citySearches = JSON.parse(localStorage.getItem('city'));

    searchCollection.innerHTML = '';

    if (citySearches) {

    for (var i = 0; i < citySearches.length; i++) {
        var citySearch = citySearches[i];

        var a = document.createElement("a");
        a.textContent = citySearch;
        a.setAttribute("href", "#!");
        a.setAttribute("class", "collection-item");
        searchCollection.appendChild(a);

        searchCollection.classList.remove('hide');
    }}
};

//Renders saved searches when page loads
function init() {
    var storedCitySearches = JSON.parse(localStorage.getItem('city'));

    if (storedCitySearches !==null) {
        citySearches = storedCitySearches;
    }

    renderCitySearch();
}

//Search button listener
searchBtn.addEventListener('click', searchCityInput);

//Recall previously searched information button listener
$(document).on("click", ".collection-item", function() {
    var cityApiBase = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.innerHTML + '&appid=f692887ab5a79b9ba5e8c4d601ee3738';

    apiCall(cityApiBase);
})

init();