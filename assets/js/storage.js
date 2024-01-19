export function addCityToLocalStorage(city) {
    if (typeof Storage !== "undefined") {
        
        const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

        storedCities.unshift(city);

        const limitedCities = storedCities.slice(0, 5);

        localStorage.setItem('cities', JSON.stringify(limitedCities));
    } else {
        console.error("LocalStorage is not supported in this browser.");
    }
}


