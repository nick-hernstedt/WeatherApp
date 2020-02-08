var cities = ["Bakersfield", "Wasco", "Shafter", "Sacramento", "Seattle"];

function displayWeatherInfo() {
  var city = $(this).attr("data-name");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=d7071c51148ee257249e99b8e34df142";

  // Creat an AJAX call for the city that you click on
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.list[0].weather[0].icon);

    console.log(response);
  

    // setting images for icons
    var snow = 'http://openweathermap.org/img/wn/13d@2x.png'
    var fewClouds = 'http://openweathermap.org/img/wn/02d@2x.png'
    var brokenClouds = 'http://openweathermap.org/img/wn/04d@2x.png'
    var scatteredClouds = 'http://openweathermap.org/img/wn/03d@2x.png'
    var showerRain = 'http://openweathermap.org/img/wn/09d@2x.png'
    var clear = 'http://openweathermap.org/img/wn/01d@2x.png'
    var thunderStorm = 'http://openweathermap.org/img/wn/11d@2x.png'
    var rain = 'http://openweathermap.org/img/wn/10d@2x.png'

        // setting city name
        var cityDiv = $('#result-name');

        //storing city name
        var name = response.city.name;

        // store the date

        var date = new Date(response.list[0].dt_txt)

        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};

        date = date.toLocaleDateString('en-US', options);

        //getting icon info
        var icon = response.list[0].weather[0].icon

        else if (icon == `01d` || icon == `01n`) {
            var image = $(`#result-icon`).attr(`src`, clear)
            $(`#result-icon`).append(image)
        } else if (icon == `02d` || icon == `02n`) {
            var image = $(`#result-icon`).attr(`src`, fewClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `03d` || icon == `03n`) {
            var image = $(`#result-icon`).attr(`src`, scatteredClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `04d` || icon == `04n`) {
            var image = $(`#result-icon`).attr(`src`, brokenClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `09d` || icon == `09n`) {
            var image = $(`#result-icon`).attr(`src`, showerRain)
            $(`#result-icon`).append(image)
        } else if (icon == `10d` || icon == `10n`) {
            var image = $(`#result-icon`).attr(`src`, rain)
            $(`#result-icon`).append(image)
        } else if (icon == `11d` || icon == `11n`) {
            var image = $(`#result-icon`).attr(`src`, thunderStorm)
            $(`#result-icon`).append(image)
        } else if (icon == `13d` || icon == `13n`) {
            var image = $(`#result-icon`).attr(`src`, snow)
            $(`#result-icon`).append(image)
        }

        //setting name and date text
        var cityName = $('#city-name').text(name + ' ' + date);

        // dispalying the city name
        cityDiv.append(cityName);

        //getting temp
        var temp = response.list[0].main.temp;

        // setting temp text
        $('#temp').text("Temperature: " + temp + 'F°');

        //getting humidity
        var humidity = response.list[0].main.humidity

        //setting humidity text
        $('#humidity').text('Humidity: ' + humidity + '%')

        // getting wind speed
        var windSpeed = response.list[0].wind.speed

        //setting wind speed
        $('#windSpeed').text('Wind Speed: ' + windspeed + 'MPH')