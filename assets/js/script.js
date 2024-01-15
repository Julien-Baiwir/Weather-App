async function getCityCoordinates(city) {
    const geocodingApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c29a355949954abe9d576d08246566b1&units=metric`;
    try {
        const response = await fetch(geocodingApi);
        const data = await response.json();
        console.log(data);
        return data;  
       
    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}
getCityCoordinates('London');

async function getWeatherforecast(latitude, longitude) {
    const weatherForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c29a355949954abe9d576d08246566b1&units=metric`;
    try {
        const response = await fetch(weatherForecastApi);
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error requesting API', error);
        throw error;
    }
}
getWeatherforecast(51.5085,
    -0.1257);
 
  
