import { GetCityPicture } from './getCityPicture.js';

async function Citysearch(cityOptions) {
    const datalistCity = document.getElementById('searchoptions');
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityOptions}&format=json`);
        const data = await response.json();
        datalistCity.innerHTML = '';

        data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.display_name;
            datalistCity.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

const userInput = document.querySelector('.UserInput');
userInput.addEventListener('input', function() {
            Citysearch (this.value);});


async function getCityWeather(city) {
    const geocodingApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

    try {
        const response = await fetch(geocodingApi);
        const data = await response.json();
        
        const weatherDescription = data.weather[0].description;
        const mainTemperature = data.main.temp;
        const minTemperature = data.main.temp_min;
        const maxTemperature = data.main.temp_max;

        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        return {
            weatherDescription,
            mainTemperature,
            minTemperature,
            maxTemperature,
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

        const cityName = data.city.name;
        const forecastList = data.list;

        return{
            cityName,
            forecastList,
        }

    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}

// ---------- DOM --------------
function addDomElements(CityWeather, CityForecast) {
    const { weatherDescription, mainTemperature, minTemperature, maxTemperature } = CityWeather;
    const {cityName} = CityForecast;
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

   
    const currentDate = new Date(); 
    resultContainer.querySelector('.app__result-container__date').textContent = `${currentDate.toDateString()}`;
  
}



// ----------MAIN CLICK --------------
async function handleNewUserInput() {
   
    const userInput = document.querySelector ('.UserInput').value;

    try {
        
        const CityWeather = await getCityWeather(userInput);
        const CityForecast = await getCityForecast(userInput);

        await GetCityPicture(userInput);

        console.log(CityWeather);
        // console.log(CityForecast);
        addDomElements(CityWeather, CityForecast);

        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}
document.getElementById('SearchButton').addEventListener('click', handleNewUserInput);
 



