import { getCityWeather } from './getCitydatas.js';
import { getCityForecast } from './getCitydatas.js';
import { GetCityPicture } from './getCityPicture.js';
import { addIcons } from './addIcons.js';
import { Citysearch } from './citySearch.js';
import { addResultContainer, addTodayTemperatures, addWeekTemperatures, addOtherCity} from './addDomElements.js';
import {addCityToLocalStorage} from './addlocalStorage.js';

const userInput = document.querySelector('.UserInput');

// Event listener for user input
userInput.addEventListener('input', function() {
    const inputText = this.value.trim();
    Citysearch(inputText);
    console.log(inputText);
    localStorage.setItem('lastSearchedCity', inputText);
    addCityToLocalStorage(inputText, container);
});

// ----Add all functions after user input value---
async function handleNewUserInput(inputText) {
    try {
        const CityWeather = await getCityWeather(inputText);
        const CityForecast = await getCityForecast(inputText);

        await GetCityPicture(inputText);

        // Pass the trimmed input value to the functions in addDomElements.js
        addResultContainer(CityWeather, CityForecast, inputText);
        addIcons(CityWeather);
        addTodayTemperatures(CityForecast);
        addWeekTemperatures(CityForecast);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Event listener for the SearchButton click
document.getElementById('SearchButton').addEventListener('click', function() {
    const inputText = userInput.value.trim();
    handleNewUserInput(inputText);
});
 
// ----Add compare cities after user input value---
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