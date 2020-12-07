//Format Date start//
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday"
  ];
  let currentlyDay = date.getDay();
  let day = days[currentlyDay];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}
let currentlyDate = document.querySelector("#currently-date");
let currentTime = new Date();
currentlyDate.innerHTML = formatDate(currentTime);
//Format Date End//

function showTemp(response) {
  document.querySelector("#currently-city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temp-change").innerHTML = Math.round(
    celsiusTemp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather").innerHTML = response.data.weather[0].description;
  document.querySelector("#img-today").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#img-today").setAttribute("alt", response.data.weather[0].description);

 
}

function searchCity(city) {
  let apiKey = "89c34fbb589f31537eeb4412cedf92ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#validationTooltipUsername").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "89c34fbb589f31537eeb4412cedf92ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event){
  event.preventDefault();
  let fahrenheitLink = (celsiusTemp * 9 ) / 5 + 32;
  document.querySelector("#temp-change").innerHTML = Math.round(fahrenheitLink);
}

function showCelsiusTemp(event){
  event.preventDefault();
  document.querySelector("#temp-change").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let location2 = document.querySelector("#search-location");
location2.addEventListener("click", showCurrentLocation);

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", showFahrenheitTemp);

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", showCelsiusTemp);

searchCity("New York");