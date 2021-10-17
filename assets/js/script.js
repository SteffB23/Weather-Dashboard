//Declare a variable to store the searched city
var city ="";
// 🔥👇👇 variable declaration **NOT DEFINED YET 👇👇🔥**
var searchCity =$("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];
// 🔥☝️👆 variable declaration **NOT DEFINED YET ☝️👆🔥**

// searches the city to see if it exists in the entries from the storage
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

// API key
var APIKey = "a4043d7599994e37cdd0d112ce66f9f8";

// Will display the 5 day forecast in current city
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}
// AJAX call
function currentWeather(city){
    // Here we build the URL so we can get a data from server side.
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        //Parse the response to display the current weather including the City name, date and the weather icon. 
        console.log(response);
    })
}

    
//Data object from servier side API
var weathericon = response.weather[0].icon;
var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
var date = new Date(response.dt*1000).toLocaleDateString();

//Concatinate the date and icon
$(currentCity).html(response.name +"(" + date + ")" + "img src="+iconurl + ">");

//Parse response to display current temp converted to Fahrenheit
var tempF = (response.main.temp - 273.15) * 1.80 +32;
$(currentTemperature).html((tempF).toFixed(2) + "&#8457");

//Humidity display
$(currentHumidty).html(response.main.humidity + "%");

//Wind speed in MPH
var ws = response.wind.speed;
var windsmph = (ws * 2.237).toFixed(1);
$(currentWSpeed).html(windsmph + "MPH");

//UV Index Display