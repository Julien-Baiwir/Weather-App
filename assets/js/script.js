import { getCityWeather } from './getCitydatas.js';
import { getCityForecast } from './getCitydatas.js';
import { GetCityPicture } from './getCityPicture.js';
import { addIcons } from './addIcons.js';
import { Citysearch } from './autoComplete.js';
import { addDomElements } from './addDomElements.js';

// -----Add user input-------
const userInput = document.querySelector('.UserInput');
userInput.addEventListener('input', function() {
            Citysearch (this.value);});

// ----Add all functions after user input ---
async function handleNewUserInput() {
   
    const userInput = document.querySelector ('.UserInput').value;

    try {
        
        const CityWeather = await getCityWeather(userInput);
        const CityForecast = await getCityForecast(userInput);

        await GetCityPicture(userInput);

        // console.log(CityWeather);
        // console.log(CityForecast);

        addIcons (CityWeather);
        addDomElements(CityWeather, CityForecast);
     
        return { CityWeather, CityForecast };

    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}
document.getElementById('SearchButton').addEventListener('click', handleNewUserInput);
 



