const apiKey = "543002caf9995f9afabb7a2283601613";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const cityList = document.querySelector(".city-list");
const maxPreviousCities = 5;

const userSearch = document.querySelector(".search input");
const userSearchBtn = document.querySelector(".search button");

async function checkWeather(city){
    const response = await fetch(apiURL + city +`&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
    document.querySelector(".weather").style.display = "block";

    addToCityList(city);
}

userSearchBtn.addEventListener("click", ()=>{
    checkWeather(userSearch.value);
    getWeather(userSearch.value)
})

function addToCityList(city) {
    // Convert the city to lowercase and capitalize the first letter
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    // Check if the city already exists in the list
    const existingCity = Array.from(cityList.querySelectorAll("li")).find(item => item.textContent === formattedCity);

    if (!existingCity) {
        // Remove the oldest city if the list exceeds the maximum limit
        if (cityList.children.length >= maxPreviousCities) {
            cityList.removeChild(cityList.firstElementChild);
        }

        const listItem = document.createElement("li");
        listItem.textContent = formattedCity;
        listItem.addEventListener("click", () => {
            userSearch.value = formattedCity;
            userSearchBtn.click();
        });

        cityList.appendChild(listItem);
    }
}

function getWeather() {
    var city = userSearch.value;
    var apiKey = "543002caf9995f9afabb7a2283601613"; 
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    $.getJSON(apiUrl, function(data) {
      var forecast = data.list;
      var forecastHtml = "";

      for (var i = 0; i < forecast.length; i += 8) {
        var date = new Date(forecast[i].dt * 1000);
        var day = date.toLocaleDateString("en-US", { weekday: 'long' });
        var temp = forecast[i].main.temp_max;

        forecastHtml += "<p>" + day + ": " + temp + "°F</p>";
      }

      document.getElementById("forecast").innerHTML = forecastHtml;
    });
  }

  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", clearCityList);
  
  function clearCityList() {
      cityList.innerHTML = "";
      localStorage.setItem("cities", "[]");
  }