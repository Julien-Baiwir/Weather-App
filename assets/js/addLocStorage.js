function addCityToLocalStorage(city, container) {
    if (typeof Storage !== "undefined") {
        const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

        if (!storedCities.includes(city)) {
            storedCities.push(city);

            const limitedCities = storedCities.slice(-5);

            localStorage.setItem('cities', JSON.stringify(limitedCities));

            loadCitiesFromLocalStorage(container);
        }
    } else {
        console.error("LocalStorage is not supported in this browser.");
    }
}