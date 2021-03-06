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
    method: "GET",
  }).then(function (response) {
    var UVIndex =
      `https://api.openweathermap.org/data/2.5/uvi?appid=9960537bc504b12a81ff658aa9dd27bd&lat=` +
      response.city.coord.lat +
      `&lon=` +
      response.city.coord.lon;

    $.ajax({
      url: UVIndex,
      method: "GET",
    }).then(function (UVResponse) {
      //UV index

      $(`#result-uv-index`).text(`UV Index: ` + UVResponse.value);
      if (UVResponse.value <= 2) {
        $(`#result-uv-index`).removeClass(`moderate high very-high`);
        $(`#result-uv-index`).addClass(`low`);
      } else if (UVResponse.value <= 5) {
        $(`#result-uv-index`).removeClass(`low high very-high`);
        $(`#result-uv-index`).addClass(`moderate`);
      } else if (UVResponse.value <= 7) {
        $(`#result-uv-index`).removeClass(`low moderate very-high`);
        $(`#result-uv-index`).addClass(`high`);
      } else {
        $(`#result-uv-index`).removeClass(`low moderate high`);
        $(`#result-uv-index`).addClass(`very-high`);
      }
    });

    // setting images for icons
    var snow = "http://openweathermap.org/img/wn/13d@2x.png";
    var fewClouds = "http://openweathermap.org/img/wn/02d@2x.png";
    var brokenClouds = "http://openweathermap.org/img/wn/04d@2x.png";
    var scatteredClouds = "http://openweathermap.org/img/wn/03d@2x.png";
    var showerRain = "http://openweathermap.org/img/wn/09d@2x.png";
    var clear = "http://openweathermap.org/img/wn/01d@2x.png";
    var thunderStorm = "http://openweathermap.org/img/wn/11d@2x.png";
    var rain = "http://openweathermap.org/img/wn/10d@2x.png";

    // setting city name
    var cityDiv = $("#city-name");

    //storing city name
    var name = response.city.name;

    // store the date

    var date = new Date(response.list[0].dt_txt);

    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    date = date.toLocaleDateString("en-US", options);

    //getting icon info
    var icon = response.list[0].weather[0].icon;
    if (icon == `01d` || icon == `01n`) {
      $(`#weatherIcon`).attr(`src`, clear);
    } else if (icon == `02d` || icon == `02n`) {
      $(`#weatherIcon`).attr(`src`, fewClouds);
    } else if (icon == `03d` || icon == `03n`) {
      $(`#weatherIcon`).attr(`src`, scatteredClouds);
    } else if (icon == `04d` || icon == `04n`) {
      $(`#weatherIcon`).attr(`src`, brokenClouds);
    } else if (icon == `09d` || icon == `09n`) {
      $(`#weatherIcon`).attr(`src`, showerRain);
    } else if (icon == `10d` || icon == `10n`) {
      $(`#weatherIcon`).attr(`src`, rain);
    } else if (icon == `11d` || icon == `11n`) {
      $(`#weatherIcon`).attr(`src`, thunderStrom);
    } else if (icon == `13d` || icon == `13n`) {
      $(`#weatherIcon`).attr(`src`, snow);
    }

    //setting name and date text
    var cityName = $("#city-name").text(name + " " + date);

    // dispalying the city name
    cityDiv.append(cityName);

    //getting temp
    var temp = response.list[0].main.temp;

    // setting temp text
    $("#temp").text("Temperature: " + temp + "F°");

    //getting humidity
    var humidity = response.list[0].main.humidity;

    //setting humidity text
    $("#humidity").text("Humidity: " + humidity + "%");

    // getting wind speed
    var windSpeed = response.list[0].wind.speed;

    //setting wind speed
    $("#windSpeed").text("Wind Speed: " + windSpeed + "MPH");

    var cardIndex = 1;
    for (var i = 0; i < response.list.length; i += 8) {
      // setting up forcast cards
      var cardDate = new Date(response.list[i].dt_txt);
      console.log(response.list[i]);
      var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      cardDate = cardDate.toLocaleDateString("en-US", options);
      console.log(cardDate);
      var cardTemp = response.list[i].main.temp;
      var cardHumidity = response.list[i].main.humidity;
      var cardIcon = response.list[i].weather[0].icon;

      $(`#day${cardIndex}date`).text(cardDate);
      $(`#day${cardIndex}Temp`).text(`Temp: ` + cardTemp + `F°`);
      $(`#day${cardIndex}Humidity`).text(`Humidity: ` + cardHumidity + `%`);

      if (cardIcon == `01d` || cardIcon == `01n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, clear);
      } else if (cardIcon == `02d` || cardIcon == `02n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, fewClouds);
      } else if (cardIcon == `03d` || cardIcon == `03n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, scatteredClouds);
      } else if (cardIcon == `04d` || cardIcon == `04n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, brokenClouds);
      } else if (cardIcon == `09d` || cardIcon == `09n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, showerRain);
      } else if (cardIcon == `10d` || cardIcon == `10n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, rain);
      } else if (cardIcon == `11d` || cardIcon == `11n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, thunderStorm);
      } else if (cardIcon == `13d` || cardIcon == `13n`) {
        $(`#day${cardIndex}Icon`).attr(`src`, snow);
      }
      cardIndex += 1;
    }
  });
}

// Function for displaying weather data
function renderButtons() {
  // Deletes the weather info prior to adding new info

  $("#cityButtons").empty();
  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generates buttons for each city in the array
    var a = $("<button>");
    // Adds a class of city to our button
    a.addClass("city btn m-1 col-12");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#cityButtons").prepend(a);
  }
}

// This function handles events where the search button is clicked
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var city = $("#cityInput").val().trim();

  // The city from the textbox is then added to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayWeatherInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
