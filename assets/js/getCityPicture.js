export async function GetCityPicture(city) {
    const accessKey = '_dxiGKT7YLMIf7ZE-a3zLHnF2UYyzeCUvPTrVPXr_us';
     const photosContainer = document.getElementById('photos-container');
    
     try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${accessKey}`);
        const data = await response.json();
        console.log(data);
      
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

