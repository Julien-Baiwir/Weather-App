// ---------- city-result__container --------------
export function addResultContainer(CityWeather, CityForecast) {
    const { weatherDescription, mainTemperature, minTemperature, maxTemperature } = CityWeather;
    const { cityName } = CityForecast;
    const MainTemperature = Math.round(mainTemperature);
    const MinTemperature = Math.round(minTemperature);
    const MaxTemperature = Math.round(maxTemperature);

    const resultContainer = document.querySelector('.app__result__container');

    resultContainer.querySelector('.app__result__container__cityName').textContent = `${cityName}`;
    resultContainer.querySelector('.app__result__container__weather-desc').textContent = `Sky: ${weatherDescription}`;
    resultContainer.querySelector('.app__result__container__degre').textContent = `${MainTemperature}°`;


    resultContainer.querySelector('.app__result__container__temp-wrap__min__title').textContent = 'Min';
    resultContainer.querySelector('.app__result__container__temp-wrap__min__temp').textContent = `${MinTemperature}°`;

    resultContainer.querySelector('.app__result__container__temp-wrap__max__title').textContent = 'Max';
    resultContainer.querySelector('.app__result__container__temp-wrap__max__temp').textContent = `${MaxTemperature}°`;

    const currentDate = new Date();
    resultContainer.querySelector('.app__result__container__date').textContent = `${currentDate.toDateString()}`;

}

export function addTodayTemperatures(CityForecast) {
    const { forecastList } = CityForecast;
    const todayContainer = document.querySelector('.app__today-temperatures');
   
   
    for (let i = 0; i < 6; i++) {

        const forecastWeatherIcon = forecastList[i].weather[0].icon;
        const forecastTimestamp = forecastList[i].dt;
        const forecastTemperature = forecastList[i].main.temp;
        const RoundTemperature = Math.round(forecastTemperature);

        const cardDiv = document.createElement('div');
        cardDiv.className = 'app__today-temperatures__wrapper';
        cardDiv.innerHTML = `
            <h2 class="app__today-temperatures__wrapper__heure">${new Date(forecastTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            <img class="app__today-temperatures__wrapper__icon" src="assets/images/${forecastWeatherIcon}.png">
            <h2 class="app__today-temperatures__wrapper__temp">${RoundTemperature}°C</h2>
        `;

        todayContainer.appendChild(cardDiv);
    }
}

export function addWeekTemperatures(CityForecast) {
    const { forecastList } = CityForecast;
    const weekContainer = document.querySelector('.app__week-temperatures');

    const nextFiveDays = forecastList.filter(forecast => {
        const forecastTimestamp = forecast.dt;
        const forecastTime = new Date(forecastTimestamp * 1000).getUTCHours();
        return forecastTime === 12;
    });
        nextFiveDays.forEach(forecast => {
        const forecastWeatherIcon = forecast.weather[0].icon;
        const forecastTemperature = forecast.main.temp;
        const RoundTemperature = Math.round(forecastTemperature);

        const cardDiv = document.createElement('div');
        cardDiv.className = 'app__week-temperatures__wrapper';
        cardDiv.innerHTML = `
            <h2 class="app__week-temperatures__wrapper__day">${new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
            <img class="app__week-temperatures__wrapper__icon" src="assets/images/${forecastWeatherIcon}.png">
            <h2 class="app__week-temperatures__wrapper__temp">${RoundTemperature}°C</h2>
        `;

        weekContainer.appendChild(cardDiv);
    });
}
