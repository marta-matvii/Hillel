const API_KEY = '40a6e1f0422db4a4cbb9d249182fb1a3';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const LVIV_LAT = 49.8397;
const LVIV_LON = 24.0297;

const elements = {
    date: document.getElementById('currentDate'),
    time: document.getElementById('currentTime'),
    temperature: document.getElementById('temperature'),
    weatherIcon: document.getElementById('weatherIcon'),
    humidity: document.getElementById('humidity'),
    feelsLike: document.getElementById('feelsLike'),
    pressure: document.getElementById('pressure'),
    weatherDescription: document.getElementById('weatherDescription'),
    windSpeed: document.getElementById('windSpeed'),
    refreshBtn: document.getElementById('refreshBtn')
};

function updateDateTime() {
    const now = new Date();
    
    const dateOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
    };
    elements.date.textContent = now.toLocaleDateString('uk-UA', dateOptions);
    
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    };
    elements.time.textContent = now.toLocaleTimeString('uk-UA', timeOptions);
}

function getWeatherIcon(code) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[code] || '🌤️';
}

function updateWeatherDisplay(data) {
    elements.temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like - 273.15)}°C`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
    elements.weatherDescription.textContent = data.weather[0].description;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.weatherIcon.textContent = getWeatherIcon(data.weather[0].icon);
}

function fetchWeather() {
    const url = `${API_URL}?lat=${LVIV_LAT}&lon=${LVIV_LON}&appid=${API_KEY}`;
    
    const weatherRequest = fetch(url);
    
    weatherRequest.then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(function(data) {
        updateWeatherDisplay(data);
    })
    .catch(function(error) {
        console.error('Помилка при отриманні погоди:', error);
        elements.weatherDescription.textContent = 'Помилка завантаження';
    });
}

function init() {
    setInterval(updateDateTime, 1000);
    updateDateTime();
    
    fetchWeather();
    
    elements.refreshBtn.addEventListener('click', function() {
        fetchWeather();
    });
}

document.addEventListener('DOMContentLoaded', init);