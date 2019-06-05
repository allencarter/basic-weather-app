"use strict";

function Weather(cityName, description, temperature, pressure, humidity, icon) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = temperature; //celsius
    this._temperatureF = ''; //farenhite
    this._windSpeed = '';
    this.pressure = pressure;
    this.humidity = humidity;
    this.icon = icon;
    this._country = country;
}

/* Convert celsuis to faranhite by multiplying celsuis integer by 1.8 then add 32. Then 
return mathical result to the user.
 We use toFixed(2) method to set decimal to 2 and therefore preventing floating numbers.
*/
Object.defineProperty(Weather.prototype, 'temperatureF', {
    get: function() {
        return this._temperatureF;
    },
    set: function(value) {
        this._temperatureF = (value * 1.8 + 32).toFixed(2) + '°F'; 
    } 
});

/* Set a custom object for wind speed. 
Wind speed returns from the api in m/s by default. 
Below converts m/s to MPH.*/
Object.defineProperty(Weather.prototype, 'windSpeed', {
    get: function() {
        return this._windSpeed;
    },
    set: function(value) {
        this._windSpeed = (value * 2.237).toFixed(0) + ' mph';
    }
});

Object.defineProperty(Weather.prototype, 'country', {
    get: function() {
        return this._country;
    },
    set: function(value) {
        this._country = (', ' + value);
    }
})


