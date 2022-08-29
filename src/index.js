import './sass/index.scss';
import axios from 'axios';

const KEY = '29585981-4b31f207c2d4bfdf8784d9dec';
const input = 'cat';
const page = '1';
const PIXABAY_URL = `https://pixabay.com/api/?key=${KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&page=${page}&per_page=40`;

async function getPictures() {
    try {
        const response = await axios.get(PIXABAY_URL);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}   

getPictures();