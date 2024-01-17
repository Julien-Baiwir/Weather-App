// ---------- city-result-container --------------
export function addResultContainer(CityWeather, CityForecast) {
    const { weatherDescription, mainTemperature, minTemperature, maxTemperature } = CityWeather;
    const {cityName} = CityForecast;
    const MainTemperature = Math.round(mainTemperature);
    const MinTemperature = Math.round(minTemperature);
    const MaxTemperature = Math.round(maxTemperature);

    const resultContainer = document.querySelector('.app__result-container');

    resultContainer.querySelector('.app__result-container__cityName').textContent = `${cityName}`;
    resultContainer.querySelector('.app__result-container__weather-desc').textContent = `Sky: ${weatherDescription}`;
    resultContainer.querySelector('.app__result-container__degre').textContent = `${MainTemperature}°`;

 
    resultContainer.querySelector('.app__result-container__temp-wrap__min__title').textContent = 'Min';
    resultContainer.querySelector('.app__result-container__temp-wrap__min__temp').textContent = `${MinTemperature}°`;

    resultContainer.querySelector('.app__result-container__temp-wrap__max__title').textContent = 'Max';
    resultContainer.querySelector('.app__result-container__temp-wrap__max__temp').textContent = `${MaxTemperature}°`;

   
    const currentDate = new Date(); 
    resultContainer.querySelector('.app__result-container__date').textContent = `${currentDate.toDateString()}`;
  
}

export function addTodayTemperatures(CityForecast) {
    const {forecastList} = CityForecast;
    const todayContainer = document.querySelector('.app__today-temperatures');

    for (let i = 0; i < 6; i++) {
     
        const forecastWeatherIcon = forecastList[i].weather[0].icon;
        const forecastTimestamp = forecastList[i].dt;
        const forecastTemperature = forecastList[i].main.temp;
       

        const cardDiv = document.createElement('div');
        cardDiv.className = 'app__today-temperatures__wrapper';
        cardDiv.innerHTML = `
            <h2 class="app__today-temperatures__wrapper__heure">${new Date(forecastTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            <img class="app__today-temperatures__wrapper__icon" src="assets/images/${forecastWeatherIcon}.png">
            <h2 class="app__today-temperatures__wrapper__temp">${forecastTemperature}°C</h2>
        `;

        todayContainer.appendChild(cardDiv);
    }
}


 
   
   