// ----------addIcons --------------
export function addIcons(CityWeather) {
    const { weatherIcons } = CityWeather;
    const icon = document.querySelector(".app__result-container__icon__icons");
    icon.src = `assets/images/${weatherIcons}.png`;
    icon.alt = "weatherIcons";
    icon.style.display = 'block';
}