
export async function getCityWeather(city) {
    const geocodingApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

    try {
        const response = await fetch(geocodingApi);
        const data = await response.json();
        console.log(data);
        const weatherDescription = data.weather[0].description;
        const mainTemperature = data.main.temp;
        const minTemperature = data.main.temp_min;
        const maxTemperature = data.main.temp_max;
        const weatherIcons = data.weather[0].icon;
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        return {
            weatherDescription,
            mainTemperature,
            minTemperature,
            maxTemperature,
            weatherIcons,
            coordinates: { latitude, longitude },
        };

    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}


export async function getCityForecast(city) {
    try {
        const { coordinates } = await getCityWeather(city);

        const ForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=c29a355949954abe9d576d08246566b1&units=metric`;

        const response = await fetch(ForecastApi);
        const data = await response.json();
        console.log(data);
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

