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

function showPosition(position) {
   
   var latitude = Math.trunc(position.coords.latitude);
   var longitude = Math.trunc(position.coords.longitude); 

   locationContainer.innerHTML = "Latitude:" + latitude + '<br />' + 'Longitude:' + longitude; 
   document.querySelector('button').style.display = 'none';

   // Call the Weather API

}



   /*

// Call the Weather API

var request = new XMLHttpRequest();
request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=73d4b65d40628531a9c6341332fe4cdc', true);

request.onload = function() {
   if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.log(data);
   } else {
      // Error Returned
   }
};

request.onerror = function() {
   // There was a connection error
};

*/

