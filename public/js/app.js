// Global Variables
const loadingContainer = document.getElementById('loading');
const app = document.getElementById('app');
const iconContainer = document.getElementById('icon');
const tempContainer = document.getElementById('temp');
const locationContainer = document.getElementById('location');
const messageContainer = document.getElementById('message');
const fallbackContainer = document.getElementById('fallbackContainer');
const errorContainer = document.getElementById('errorContainer');
var XMLHttpRequest;

// getJSON Vanilla JS Function
function getJSON (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
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
function getLocation () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather, showError);
	} else {
		errorContainer.innerHTML = 'Geolocation is not supported by this browser.';
		requestZip();
	}
}

// Geolocation Fallback - Error Handling
function showError (error) {
	var x = errorContainer;

	// Hide the Loader
	loadingContainer.style.display = 'none';

	// Show the Fallback Container
	requestZip();

	switch (error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML = 'User denied the request for Geolocation.';
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = 'Location information is unavailable.';
			break;
		case error.TIMEOUT:
			x.innerHTML = 'The request to get user location timed out.';
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = 'An unknown error occurred.';
			break;
	}
}

// Geolocation Fallback - Display Zip
function requestZip () {
	fallbackContainer.style.display = 'block';
}

// Geolocation Fallback - Form Submit to API
document.getElementById('zipcodeForm').onsubmit = function (event) {
	event.preventDefault();

	var zipcode = document.getElementById('zipcode').value;
	getWeatherZip(zipcode);
};

// Configure Messages Based on Current Temp
function damnMessage (temp) {
	var message;
	if (temp < 32) {
		message = 'It\'s below damn freezing. Wear some damn layers.';
	} else if (temp >= 32 && temp <= 60) {
		message = 'Pretty damn chilly. Grab a sweater or a damn coat.';
	} else if (temp >= 60 && temp <= 75) {
		message = 'It\'s about damn perfect. Get off your phone.';
	} else if (temp >= 75 && temp <= 85) {
		message = 'Pretty damn warm. Plan accordingly.';
	} else if (temp >= 85) {
		message = 'It\'s damn hot. Wear shorts.';
	}

	return message;
}

// Configure Icons Based on Weather Status Text
function damnIcon (iconTest) {
	var icon;
	if (iconTest.includes('cloud') === true) {
		icon = 'cloudy';
	} else if (iconTest.includes('rain')) {
		icon = 'rainy';
	} else if (iconTest.includes('storm')) {
		icon = 'stormy';
	} else {
		icon = 'sunny';
	}

	// Append the Correct Icon
	iconContainer.src = './img/' + icon + '.svg';
}

// Status Cleanup (Fixing Capitalization From API)
function statusCleanup (status) {
	status = status.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
	return status;
}

// Kelvin to Fahrenheit Conversion
function kelvinToFahrenheit (tempInK) {
	var tempInF = tempInK * 9 / 5 - 459.76;
	return Math.trunc(tempInF);
}

// Get the Weather & Display (Based on Coordinates)
function getWeather (position) {
	// Remove Loading Indicator
	loadingContainer.style.display = 'none';

	// Coordinates
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	// API URL Construction
	var apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather?';
	var latURL = 'lat=' + latitude;
	var lonURL = '&lon=' + longitude;
	var apiKey = '&appid=f27c35340d03585589cd7538556323fc';
	var apiURL = apiBaseURL + latURL + lonURL + apiKey;

	// Get Data
	getJSON(apiURL, function (data) {
		var temp = kelvinToFahrenheit(data.main.temp);
		var status = data.weather[0].description;
		var message;

		// Render Temp
		tempContainer.innerHTML = temp + '&#176;';

		// Render Location
		locationContainer.innerHTML = data.name;

		// Combined Weather Status & Damn Message
		status = statusCleanup(status);
		message = damnMessage(temp);
		messageContainer.innerHTML = status + '. ' + message;

		// Combine Status & Message for damnIcon Function
		var iconTest = status + ' ' + message;

		// Run the Icon Check
		damnIcon(iconTest);
	});
}

// Get the Weather & Display (Based on Zipcode)
function getWeatherZip (zip) {
	// Remove Zipcode Form
	fallbackContainer.style.display = 'none';

	// Remove Error Container
	errorContainer.style.display = 'none';

	// API URL Construction
	var apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather?';
	var zipcode = 'zip=' + zip + ',' + 'us';
	var apiKey = '&appid=f27c35340d03585589cd7538556323fc';
	var apiURL = apiBaseURL + zipcode + apiKey;

	// Get Data
	getJSON(apiURL, function (data) {
		var temp = kelvinToFahrenheit(data.main.temp);
		var status = data.weather[0].description;
		var message;

		// Render Temp
		tempContainer.innerHTML = temp + '&#176;';

		// Render Location
		locationContainer.innerHTML = data.name;

		// Combined Weather Status & Damn Message
		status = statusCleanup(status);
		message = damnMessage(temp);
		messageContainer.innerHTML = status + '. ' + message;

		// Combine Status & Message for damnIcon Function
		var iconTest = status + ' ' + message;

		// Run the Icon Check
		damnIcon(iconTest);
	});
}

// Run the App!
getLocation();
