// Global Variables
const app = document.getElementById('app');

// Get the User's Location
function getLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
      app.innerHTML = 'Loading...';
   } else {
      app.innerHTML = "Geolocation is not supported by this browser.";
   }
}

getLocation();

function getWeather(position) {

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

   getJSON(apiURL, function(weatherInfo) {
      console.log(weatherInfo);
      app.innerHTML = weatherInfo.name + ', ' + weatherInfo.weather[0].description + ', ' + kelvinToFahrenheit(weatherInfo.main.temp);
   });
   

}


// getJSON Vanilla JS Function
// ---------------------------

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
