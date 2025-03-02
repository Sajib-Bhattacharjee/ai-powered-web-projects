const apiKey = 'your_api_key'; // Replace with your API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const themeToggle = document.getElementById('theme-toggle');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weather-condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastList = document.getElementById('forecast-list');

// Fetch current weather
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// Fetch 5-day forecast
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}

// Display current weather
function displayCurrentWeather(data) {
  if (!data) {
    cityName.textContent = 'City not found';
    temperature.textContent = '--°C';
    weatherCondition.textContent = '--';
    humidity.textContent = 'Humidity: --%';
    windSpeed.textContent = 'Wind: -- m/s';
    return;
  }
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherCondition.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;
}

// Display 5-day forecast
function displayForecast(data) {
  forecastList.innerHTML = '';
  if (!data) {
    forecastList.innerHTML = '<p>No forecast data available.</p>';
    return;
  }
  const dailyForecast = data.list.filter((item, index) => index % 8 === 0);
  dailyForecast.forEach((item) => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <p>${new Date(item.dt * 1000).toLocaleDateString()}</p>
      <p>${Math.round(item.main.temp)}°C</p>
      <p>${item.weather[0].description}</p>
    `;
    forecastList.appendChild(forecastItem);
  });
}

// Handle search
searchBtn.addEventListener('click', async () => {
  const city = cityInput.value;
  if (city) {
    const currentWeather = await fetchWeather(city);
    const forecast = await fetchForecast(city);
    displayCurrentWeather(currentWeather);
    displayForecast(forecast);
  }
});

// Handle geolocation
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
      );
      const data = await response.json();
      const forecast = await fetchForecast(data.name);
      displayCurrentWeather(data);
      displayForecast(forecast);
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
});

// Handle dark/light mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️'
    : '🌙';
});

// Load default city on page load
window.onload = async () => {
  const defaultCity = 'London';
  const currentWeather = await fetchWeather(defaultCity);
  const forecast = await fetchForecast(defaultCity);
  displayCurrentWeather(currentWeather);
  displayForecast(forecast);
};
