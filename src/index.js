import './sass/index.scss';
import axios from 'axios'; 
import { Notify } from 'notiflix';


const galleryEl = document.querySelector('.gallery');
const submitEl = document.querySelector('#search-form');
const loadMoreEl = document.querySelector('.load-more')

const KEY = '29585981-4b31f207c2d4bfdf8784d9dec';

let page = 1;
let items = [];
let input = '';

axios.defaults.baseURL = 'https://pixabay.com/api/?';

function imgTamplates ({ webformatURL, likes, views, comments, downloads, tags }) {
    return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes<span>${likes}</span></b>
                    </p>
                    <p class="info-item">
                        <b>Views<span>${views}</span></b>
                    </p>
                    <p class="info-item">
                        <b>Comments<span>${comments}</span></b>
                    </p>
                    <p class="info-item">
                        <b>Downloads<span>${downloads}</span></b>
                    </p>
                </div>
            </div>`
}

function render() {
    const listImgCard = items.map((item) => imgTamplates(item)).join('');
    galleryEl.insertAdjacentHTML('beforeend', listImgCard);
}

function buttonOff() {
    loadMoreEl.classList.add('is-hidden');
}

function buttonOn() {
    loadMoreEl.classList.remove('is-hidden');
}

async function fetchData() {
    try {
        const response = await axios.get(`&key=${KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&page=${page}&per_page=40`);
        items = [...response.data.hits];
        console.log(response.data);

        if (items.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        } 
        
        if (page > ((response.data.totalHits)/40)) {
            Notify.failure(`We're sorry, but you've reached the end of search results.`);
            buttonOff();
            return;
        }
        
        render();
        buttonOn();
    } catch (error) {
        console.error(error);
    }
}   

function onSubmit(e) {
    e.preventDefault();

    if (e.target.elements.searchQuery.value === input) return;

    if (e.target.elements.searchQuery.value !== input) {        
        galleryEl.innerHTML = '';
        input = e.target.elements.searchQuery.value;
    }
    
    buttonOff();
    fetchData();
    
}

function onClick(e) {
    page += 1;

    fetchData();
    // console.log(e.target);
}

submitEl.addEventListener('submit', onSubmit);
loadMoreEl.addEventListener('click', onClick);

