const url = "http://api.openweathermap.org/";
const apiKey = `393eeb90be3bedb143a4dd6632d378b4`;
let lat;
let lon;
let cityName;
let weatherBox = document.querySelector(".weather-box");
let data;
let minTemp;
let maxTemp;
let temp;
let icon;



function getMyLocation() {
    navigator.geolocation.getCurrentPosition(showPosition) 
}        
function showPosition(position) {
    lat = position.coords.latitude; 
    lon = position.coords.longitude;  
    getApiDataFromLatELon()
}
function getApiDataFromLatELon(){
    let promise = axios.get(`${url}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    promise.then(displayData);
}
function getCityLocation(){
    cityName = document.querySelector("input").value;
    getApiDataFromCityName()
}
function getApiDataFromCityName(){
    let promise = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${apiKey}`);
    promise.then(getCityLatELon);
    promise.catch((errorNum) => {
        alert(`Select a valid location!`)
    })
}
function getCityLatELon(apiResponse){
    lat = apiResponse.data[0].lat
    lon = apiResponse.data[0].lon
    getApiDataFromLatELon()
}
function displayData(apiResponse){
    data = apiResponse.data;
    convertTemperature()
    console.log(data)
}
function convertTemperature(){
    maxTemp = (data.main.temp_max - 273.15).toFixed(1);
    minTemp = (data.main.temp_min - 273.15).toFixed(1);
    temp = (data.main.temp - 273.15).toFixed(1);
    displayWeather()
}
function displayWeather(){
    weatherBox.innerHTML = `
    <h2>${data.name}</h2>
    <h1 class="current-weather">${temp}°C</h1>
    <div class="min-max">
        <h5>Min: ${minTemp}°C</h5>
        <h5>Max: ${maxTemp}°C</h5>
    </div>
    `
    document.querySelector("body").classList.remove("default");
    document.querySelector("body").classList.add(data.weather[0].main);
}