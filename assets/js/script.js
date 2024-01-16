import { format } from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';


async function Citiesearch(citiyoptions) {
    const datalistVille = document.getElementById('searchoptions');
    try {

        const response = await fetch('https://nominatim.openstreetmap.org/search?city=${saisie}&format=json');
        const data = await response.json();
        data.innerHTML = '';

        data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.display_name;
            datalistVille.appendChild(option);

        });
    } catch (error) {
        console.error('Erreur lors du chargement des villes :', error);
    }
}



async function getCityWeather(city) {
    const geocodingApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

    try {
        const response = await fetch(geocodingApi);
        const data = await response.json();
        console.log(data);
        const weatherDescription = data.weather[0].description;
        const mainTemperature = data.main.temp;
        const minTemperature = data.main.temp_min;
        const maxTemperature = data.main.temp_max;
        const timestamp = data.dt;
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        return {
            weatherDescription,
            mainTemperature,
            minTemperature,
            maxTemperature,
            timestamp,
            coordinates: { latitude, longitude },
        };

    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}


async function getCityForecast(city) {
    try {
        const { coordinates } = await getCityWeather(city);

        const ForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

        const response = await fetch(ForecastApi);
        const data = await response.json();
        // console.log(data);
        const cityName = data.city.name;
        const forecastList = data.list;

        return {
            cityName,
            forecastList,
        }

    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}
// ------CURRENT TIME---------
// addHours

function formatTimestamp(timestamp) {
    const timestampInMilliseconds = timestamp * 1000;
    const myDate = new Date(timestampInMilliseconds);
    const dateFormat = 'yyyy-MM-dd HH:mm:ss';
    return format(myDate, dateFormat);
}


// ---------- DOM --------------
function addDomElements(CityWeather, CityForecast) {
    const { weatherDescription, mainTemperature, timestamp, minTemperature, maxTemperature } = CityWeather;
    const { cityName } = CityForecast;
    const MainTemperature = Math.round(mainTemperature);
    const MinTemperature = Math.round(minTemperature);
    const MaxTemperature = Math.round(maxTemperature);

    const resultContainer = document.querySelector('.app__result-container');

    resultContainer.querySelector('.app__result-container__cityName').textContent = `${cityName}`;
    resultContainer.querySelector('.app__result-container__weather-desc').textContent = `Weather: ${weatherDescription}`;
    resultContainer.querySelector('.app__result-container__degre').textContent = `${MainTemperature}°`;


    resultContainer.querySelector('.app__result-container__temp-wrap__min__title').textContent = 'Min';
    resultContainer.querySelector('.app__result-container__temp-wrap__min__temp').textContent = `${MinTemperature}°`;

    resultContainer.querySelector('.app__result-container__temp-wrap__max__title').textContent = 'Max';
    resultContainer.querySelector('.app__result-container__temp-wrap__max__temp').textContent = `${MaxTemperature}°`;

    const formattedDate = formatTimestamp(timestamp);
    resultContainer.querySelector('.app__result-container__date').textContent = formattedDate;

}



// ----------MAIN CLICK --------------
async function handleNewUserInput() {

    const userInput = document.getElementsByClassName('UserInput').value;

    try {

        const CityWeather = await getCityWeather(userInput);
        const CityForecast = await getCityForecast(userInput);

        console.log(CityWeather);
        // console.log(CityForecast);
        addDomElements(CityWeather, CityForecast);

        // const timestamp = CityWeather.timestamp;
        // const formattedDate = formatTimestamp(timestamp);
        // console.log(formattedDate);

        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);

    }
}
document.getElementById('SearchButton').addEventListener('click', handleNewUserInput);


// --------------


