import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?';

export async function fetchData(key,input,page) {
    try {
        const response = await axios.get(`&key=${key}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&page=${page}&per_page=40`);
        return response;

    
    } catch (error) {
        console.error(error);
    }
}  