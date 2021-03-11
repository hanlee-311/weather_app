var weatherApiBase = 'http://maps.openweathermap.org/maps/2.0/weather/' + op + "/" + z + "/" + x + "/" + y + "&appid=f692887ab5a79b9ba5e8c4d601ee3738";

fetch(weatherApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // link to download
    console.log(data.items[1].files.regular);
    // serif/sans
    console.log(data.items[1].category);
    // family
    console.log(data.items[1].family);
});
