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
