"use strict";


searchBtn.addEventListener('click', searchWeather);
//global scope to display message before user begins to search 
standBy.textContent = 'Please enter a City name to begin..';
appVersion.innerHTML = 'version 1.0'

function searchWeather(){
   standBy.textContent = 'loading...'; // Display loading text when user clicks 'Show' button.
   var cityName = searchCity.value;
   var http = new XMLHttpRequest();
   var apiKey = ''; // Sign up for openweathermap.org to get your free api key.
   var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
   var method = 'GET';

http.open(method, url);
http.onreadystatechange = function() {   
    if( cityName.length > 1 ) {
        if(http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.windSpeed  = data.wind.speed;
            weatherData.temperature = data.main.temp + '°C';
            weatherData.temperatureF = data.main.temp;
            weatherData.pressure = data.main.pressure;
            weatherData.humidity = data.main.humidity;
            weatherData.icon = data.weather.icon;
            weatherData.country = data.sys.country;
            return updateWeather(weatherData);
        } else if (http.readyState == XMLHttpRequest.DONE) {
            standBy.textContent = ('Database error. Please try again...');
            standBy.style.color = 'red';
        }
       }
       else {
           standBy.textContent = ('City name field cannot be blank...');
           standBy.style.color = 'red';
       }
};
   http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherWindSpeed.textContent = weatherData.windSpeed;
    weatherTemperature.textContent = weatherData.temperature;
    weatherTemperatureF.textContent = weatherData.temperatureF;
    weatherPressure.textContent = weatherData.pressure;
    weatherHumidity.textContent = weatherData.humidity;
    weatherIcon.textContent = weatherData.icon;
    weatherCountry.textContent = weatherData.country;

    standBy.style.color = '#EEFF07';

/* Create our function to find our array of weatherDescription to see if we 
can find specific words and if so then output a message to the user in accordance with a 
single word of the weather description. 
 */
function displayReport() {
    var array = weatherDescription.textContent;
    var seperateArray = array.split(' ');
    var p = document.querySelector('#report');
    var imgIcon = document.querySelector('#weatherIcon');
    var inner = imgIcon;
    var h3 = document.querySelector('h3');
    h3.innerHTML = 'The Weatherman/woman Report: <br>'
    for (var i = 0; i < seperateArray.length; i++) {
        console.log(seperateArray[i]);
        var result = seperateArray[i];
        if( result === 'FEW') {
            inner.innerHTML = '<img src="./imgs/Few-Clouds.png">';
            return p.textContent = '"There are only a few clouds in the area! Everyone, just please remain calm!' + 
            ' It\'s not going to rain! (Famous last words)."';
        }
        if( result === 'CLEAR') {
            inner.innerHTML = '<img src="./imgs/Clear-Sky.png">';
            return p.textContent = '"No rain! It\'s a nice clear day! Now a good time to put on those man-kini\'s.' +
            ' No wait. Don\'t! Please, just don\'t!"';
        }
        if( result === 'THUNDERSTORM') {
            inner.innerHTML = '<img src="./imgs/thunder.png">';
            return p.textContent = '"I have shocking news everyone! Today, there is a thunderstorm!' +
            ' Time to run for cover like Usain Bolt! I know, I know, my jokes are quite simply shocking!"';
        }
        if( result === 'RAIN' ) {
            inner.innerHTML = '<img src="./imgs/rain.png">';
            return p.textContent = '"Pff Rain, not great for BBQ day! But hey! Look on the bright side!' +
            ' At least we can continue to have a glass of water! No you\'re right! This sucks!"';
        }
        if( (result === 'CLOUDS') ) {
            inner.innerHTML = '<img src="./imgs/Few-Clouds.png">';
            return p.textContent = '"There are clouds larking a round.' +
            ' Everyone stay calm! Let\'s not dance for a while to avoid pleasing the rain GOD\'s."';
        }
        if( (result === 'BROKEN') ) {
            inner.innerHTML = '<img src="./imgs/broken.png">';
            return p.textContent = '"There are broken clouds in the sky people!' +
            ' Will someone please show some compassion and get up there and fix those clouds!"';
        }
        if( (result === 'DRIZZLE') ) {
            inner.innerHTML = '<img src="./imgs/drizzle.png">';
            return p.textContent = '"Just calm down! It\'s only drizzle! Since when did drizzle hurt anyone? Anyway,' + 
           ' that\'s it from me on the weather. Few drizzle here and there but not the end of the world. Bye for now! "';
        }
         if( (result === 'MIST') || (result === 'FOG') || (result === 'FOGGY') || (result === 'HAZE') ) {
            inner.innerHTML = '<img src="./imgs/mist.png">';
            return p.textContent = '"Ahh yes fog, mist or hazey weather. Makes for bad visibility.' +
            ' But look on the brightside! It is a time where everyone is far more better looking outdoors."';
        }    
        if( (result === 'SNOW') || (result === 'ICE') ) {
            inner.innerHTML = '<img src="./imgs/snow.png">';
            return p.textContent = '"Nightmare for commuters. Great fun for kids. What I meant by kids! I meant parents!"';
        }  
    }
    }; displayReport();
}