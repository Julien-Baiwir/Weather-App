export async function Citysearch(cityOptions) {
    const datalistCity = document.getElementById('searchoptions');
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityOptions}&format=json`);
        const data = await response.json();
        datalistCity.innerHTML = '';

        data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.display_name;
            datalistCity.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}