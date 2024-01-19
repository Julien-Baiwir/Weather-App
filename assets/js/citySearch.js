export async function Citysearch(cityName) {
    const searchParams = new URLSearchParams({
        q: cityName,
        format: "json",
        limit: 5,
        featureType: "city"
    });

    const datalistCity = document.getElementById('searchoptions');

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${searchParams}`);
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






