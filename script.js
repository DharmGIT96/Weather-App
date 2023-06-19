// Get user's location weather
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon, 'locationWeather');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Get weather for a specific city
function getCityWeather() {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput.trim() !== '') {
        const url =  `https://api.openweathermap.org/data/2.5/weather?q={New Delhi}&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f}`;

        /* `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f
    }`;   */
        // `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=8dd1a165fd4f40c588380258231406`;

        //  `https://api.openweathermap.org/data/2.5/weather?q={New Delhi}&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeather(data, 'cityWeather');
            })
            .catch(error => {
                alert('An error occurred while fetching weather data.');
                console.error(error);
            });
    } else {
        alert('Please enter a city.');
    }
}

// Fetch weather data from the API
function getWeather(latitude, longitude, weatherDivId) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f
}`;
    // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f}`;
    // `https://api.openweathermap.org/data/2.5/weather?q={New Delhi}&appid={ecf8d285e5fe91fbb2ca2f8edaa2de6f}`;
    // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=45dbfd5a5c7ccc1666c8733b4476bb68`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, weatherDivId);
        })
        .catch(error => {
            alert('An error occurred while fetching weather data.');
            console.error(error);
        });
}

// Display weather information
function displayWeather(data, weatherDivId) {
    const weatherDiv = document.getElementById(weatherDivId);
    weatherDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherDiv.textContent = 'City not found.';
        return;
    }

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const weatherDescription = data.weather[0].description;

    const weatherInfo = document.createElement('p');
    weatherInfo.textContent = `City: ${cityName}\nTemperature: ${temperature}°C\nDescription: ${weatherDescription}`;

    weatherDiv.appendChild(weatherInfo);
}
