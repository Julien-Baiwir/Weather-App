async function getCityDataAndCoordonates(city) {
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


async function getCityNameandForecast(city) {
    try {
        const { coordinates } = await getCityDataAndCoordonates(city);

        const weatherForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

        const response = await fetch(weatherForecastApi);
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


async function handleSearchButtonClick() {
   
    const userInput = document.getElementById('UserInput').value;

    try {
        
        const cityData = await getCityDataAndCoordonates(userInput);
        const forecastData = await getCityNameandForecast(userInput);

        // Do something with the data (e.g., update the DOM)
        console.log(cityData);
        console.log(forecastData);
    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}

document.getElementById('SearchButton').addEventListener('click', handleSearchButtonClick);




 
  
