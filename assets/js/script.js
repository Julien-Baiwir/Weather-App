import { getCityWeather } from './getCitydatas.js';
import { getCityForecast } from './getCitydatas.js';
import { GetCityPicture } from './getCityPicture.js';
import { addIcons } from './addIcons.js';
import { Citysearch } from './citySearch.js';
import { addResultContainer, addTodayTemperatures, addWeekTemperatures, addOtherCity} from './addDomElements.js';
import { addCityToLocalStorage } from './storage.js';
// import { } from './chart.js';

const userInput = document.querySelector('.UserInput');

userInput.addEventListener('input', function() {
    const inputText = this.value;
    Citysearch(inputText);
});


async function handleNewUserInput() {
   
    const userInput = document.querySelector ('.UserInput').value;
    
    try {
        
        const CityWeather = await getCityWeather(userInput);
        const CityForecast = await getCityForecast(userInput);

        await GetCityPicture(userInput);

        addResultContainer(CityWeather, CityForecast);
        addIcons (CityWeather);
        addTodayTemperatures(CityForecast);
        addWeekTemperatures(CityForecast);
        
        addCityToLocalStorage(userInput);
     
        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}
document.getElementById('SearchButton').addEventListener('click', handleNewUserInput);



async function handleCompareCityInput() {
   
    const userInput = document.querySelector ('.UserInput').value;

    try {
        
        const CityWeather = await getCityWeather(userInput);
        const CityForecast = await getCityForecast(userInput);

        addOtherCity(CityForecast, CityWeather)
     
        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}
document.getElementById('CompareButton').addEventListener('click', handleCompareCityInput);


async function handlePageRefresh() {
    const userInputElement = document.querySelector('.UserInput');

    const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
    userInputElement.value = storedCities.length > 0 ? storedCities[0] : '';

    try {
    
        const CityWeather = await getCityWeather(userInputElement.value);
        const CityForecast = await getCityForecast(userInputElement.value);

        await GetCityPicture(userInputElement.value);

        addResultContainer(CityWeather, CityForecast);
        addIcons(CityWeather);
        addTodayTemperatures(CityForecast);
        addWeekTemperatures(CityForecast);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
document.addEventListener('DOMContentLoaded', handlePageRefresh);
