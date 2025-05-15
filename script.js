const apiKey = "a89fa1c2abde5734f5fd41a1e174bf42";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.querySelector(".error");
const weatherInfo = document.querySelector(".weather");
const loadingSpinner = document.querySelector(".loading");

async function checkWeather(city) {
    try {
        errorMsg.style.display = "none";
        weatherInfo.style.display = "none";
        loadingSpinner.style.display = "block";

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        const weatherMap = {
            "Clouds": "fa-cloud",
            "Clear": "fa-sun",
            "Rain": "fa-cloud-rain",
            "Drizzle": "fa-cloud-rain",
            "Mist": "fa-smog",
            "Fog": "fa-smog",
            "Snow": "fa-snowflake",
            "Thunderstorm": "fa-bolt"
        };

        const iconClass = weatherMap[data.weather[0].main] || "fa-question";
        weatherIcon.className = "fas weather-icon"; // Reset class
        weatherIcon.classList.add(iconClass);

        weatherInfo.style.display = "block";
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
        setTimeout(() => {
            errorMsg.style.display = "none";
        }, 3000);
    } finally {
        loadingSpinner.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim().replace(/\s+/g, " ");
    if (city) {
        checkWeather(city);
    } else {
        errorMsg.textContent = "Please enter a city name";
        errorMsg.style.display = "block";
        setTimeout(() => errorMsg.style.display = "none", 3000);
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim().replace(/\s+/g, " ");
        if (city) {
            checkWeather(city);
        } else {
            errorMsg.textContent = "Please enter a city name";
            errorMsg.style.display = "block";
            setTimeout(() => errorMsg.style.display = "none", 3000);
        }
    }
});

// Load default city
checkWeather("London");
