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

function formatHours(timestamp){
  let date = new Date(timestamp);
    let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  return `${hour}:${minutes}`;
}
}
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

function showForecast(response){
  let forecastElemnent = document.querySelector("#forecast");
  forecastElemnent.innerHTML = null;
let forecast = null;
for (let index = 0; index < 4; index++) {
  forecast = response.data.list[index];
forecastElemnent.innerHTML += `<li>
                <h3>${formatHours(forecast.dt * 1000)}</h3>
                <img
                  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                />
                <span id="temps">
                  <span class="temp-max">${Math.round(forecast.main.temp_max)}º</span> /
                  <span class="temp-min">${Math.round(forecast.main.temp_min)}º</span></span
                >
              </li>`;
}
}

function searchCity(city) {
  let apiKey = "89c34fbb589f31537eeb4412cedf92ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#validationTooltipUsername").value;
  searchCity(city);
}

function showCurrentForecast(response){
  let forecastElemnent = document.querySelector("#forecast");
  forecastElemnent.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 4; index++) {
  forecast = response.data.list[index];
  forecastElemnent.innerHTML += `<li>
           <h3>${formatHours(forecast.dt * 1000)}</h3>
                <img
                  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                />
                <span id="temps">
                  <span class="temp-max">${Math.round(forecast.main.temp_max)}º</span> /
                  <span class="temp-min">${Math.round(forecast.main.temp_min)}º</span></span
                >
              </li>`;
}
}

function searchLocation(position) {
  let apiKey = "89c34fbb589f31537eeb4412cedf92ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentForecast);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event){
  event.preventDefault();
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitLink = (celsiusTemp * 9 ) / 5 + 32;
  document.querySelector("#temp-change").innerHTML = Math.round(fahrenheitLink);
}

function showCelsiusTemp(event){
  event.preventDefault();
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
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