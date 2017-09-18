
// Determine Location
var locationContainer = document.getElementById('locationContainer');
var weatherContainer = document.getElementById('weatherContainer');

function getLocation() {

   // Show Loading Text
   document.querySelector('button').innerHTML = "Loading...";

   // Query Location or Browser Error
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   } else {
      locationContainer.innerHTML = "Geolocation is not supported by this browser.";
   }
}

getLocation();

function showPosition(position) {
   
   var latitude = Math.trunc(position.coords.latitude);
   var longitude = Math.trunc(position.coords.longitude); 

   locationContainer.innerHTML = "Latitude:" + latitude + '<br />' + 'Longitude:' + longitude; 
   document.querySelector('button').style.display = 'none';

   // Call the Weather API
   showWeather(latitude, longitude);
}


var request = new XMLHttpRequest();

function showWeather(latitude, longitude) {
   request.open('GET', 'http://api.ornweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + 
      '&APPID=73d4b65d40628531a9c6341332fe4cdc', true);
   
   request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
         // Success!
         var data = JSON.parse(this.response);
         console.log(data);
      }  else {
         // Return Error
         console.log('Something went wrong');
      }
   }
};

showWeather(83, 24);

request.onerror = function() {
   // There was a connection error
};
