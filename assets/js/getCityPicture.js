export async function GetCityPicture(city) {
    const accessKey = '_dxiGKT7YLMIf7ZE-a3zLHnF2UYyzeCUvPTrVPXr_us';
     const photosContainer = document.querySelector('.app__result-container__photos-container');
    
     try {
        photosContainer.innerHTML = '';
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${accessKey}`);
        const data = await response.json();

        const firstFivePhotos = data.results.slice(0, 5);

        firstFivePhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            img.classList.add('app__result-container__photos-container__miniatures');
            photosContainer.appendChild(img);
        }); 
      
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

