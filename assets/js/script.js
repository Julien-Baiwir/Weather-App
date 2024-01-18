import { getCityWeather } from './getCitydatas.js';
import { getCityForecast } from './getCitydatas.js';
import { GetCityPicture } from './getCityPicture.js';
import { addIcons } from './addIcons.js';
import { Citysearch } from './autoComplete.js';
import { addResultContainer, addTodayTemperatures, addWeekTemperatures, addOtherCity} from './addDomElements.js';

// -----Add user input value -------
const userInput = document.querySelector('.UserInput');
userInput.addEventListener('input', function() {
            Citysearch (this.value);});

// ----Add all functions after user input value---
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
       
     
        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}
document.getElementById('SearchButton').addEventListener('click', handleNewUserInput);
 
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


