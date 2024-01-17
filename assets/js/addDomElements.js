// ---------- city-result-container --------------
export function addDomElements(CityWeather, CityForecast) {
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