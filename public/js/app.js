// Global Variables
const loadingContainer = document.getElementById('loading');
const app = document.getElementById('app');
const iconContainer = document.getElementById('icon');
const statusContainer = document.getElementById('status');
const tempContainer = document.getElementById('temp');
const locationContainer = document.getElementById('location');

var weatherData;

// getJSON Vanilla JS Function
function getJSON(url, callback) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.onload = function (e) {
      if (xhr.readyState === 4) {
         if (xhr.status === 200) {
            var res = xhr.responseText;
            callback(JSON.parse(res));
         } else { 
            console.error(xhr.statusText);
         } 
      }
   }; 
   xhr.onerror = function (e) {
      console.error(xhr.statusText);
   };  
   xhr.send(null);
}

// Get the User's Location
function getLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
      loadingContainer.innerHTML = 'Loading...';
   } else {
      app.innerHTML = "Geolocation is not supported by this browser.";
   }
}


// Configure Messages
function damnMessage(temp) {
   var message;
   if (temp < 32) {
      message =  'It\'s below damn freezing. Wear some damn layers.';
   } else if (temp >= 32 && temp <= 60) {
      message = 'Pretty damn chilly. Grab a sweater or a damn coat.';
   } else if (temp >= 60 && temp <= 75) {
      message = 'It\'s about damn perfect. Get off your phone.';
   } else if (temp >= 75 && temp <= 85) {
      message = 'Pretty damn warm. Plan accordingly.';
   } else if (temp >= 85) {
      message = 'It\'s damn hot. Wear shorts.';
   }

   // Append the message
   document.getElementById('message').innerHTML = message;
}


// Configure Icons
function damnIcon(status) {
   var icon;
   if (status.includes('cloud') === true) {
      icon = 'cloudy';
   } else if (status.includes('rain')) {
      icon = 'rainy';
   } else if (status.includes('storm')) {
      icon = 'stormy';
   } else {
      icon = 'sunny';
   }

   // Append the icon
   iconContainer.src = './img/' + icon + '.svg'
}

// Status Cleanup (Fixing Capitalization From API)
function statusCleanup(status) {
   status = status.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
   });
   return status;
}

// Get the Weather & Display
function getWeather(position) {

   // Remove Loading Indicator
   loadingContainer.style.display = 'none';

   // Coordinates
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;

   // API URL Construction
   var apiBaseURL = 'http://api.openweathermap.org/data/2.5/weather?';
   var latURL = 'lat=' + latitude;
   var lonURL = '&lon=' + longitude;
   var apiKey = '&appid=f27c35340d03585589cd7538556323fc';
   var apiURL = apiBaseURL + latURL + lonURL + apiKey;

   // Kelvin to Fahrenheit Conversion
   function kelvinToFahrenheit(tempInK) {
      var tempInF = tempInK * 9/5 - 459.76;
      return Math.trunc(tempInF);
   }

   // Get Data
   getJSON(apiURL, function(data) {

      var temp = kelvinToFahrenheit(data.main.temp);
      var status = data.weather[0].description; 

      // Render Weather Icon
      damnIcon(status);
      // Render Weather Status
      statusContainer.innerHTML = statusCleanup(status);
      // Render Temp
      tempContainer.innerHTML = temp;
      // Render Location
      locationContainer.innerHTML = data.name;

      // Message
      damnMessage(temp);
   });
}



// Run it!
// -------

getLocation();
