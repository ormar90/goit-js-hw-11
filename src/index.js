import './sass/index.scss'; 
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { imgTamplates } from './js/tamplates';
import { fetchData } from './js/fetchImges';


const galleryEl = document.querySelector('.gallery');
const submitEl = document.querySelector('#search-form');
const loadMoreEl = document.querySelector('.load-more')

const KEY = '29585981-4b31f207c2d4bfdf8784d9dec';


let page = 1;
let inputValue = '';

const simpleLightboxGallery = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionClass: 'caption',
});

submitEl.addEventListener('submit', onSubmit);
loadMoreEl.addEventListener('click', onClick);

async function onSubmit(e) {
    e.preventDefault();
    page = 1;

    if (inputValue === e.target.elements.searchQuery.value.trim()) {
        return;
    }

    if (inputValue !== e.target.elements.searchQuery.value.trim()) {
        galleryEl.innerHTML = '';
        buttonOff();
    }

    inputValue = e.target.elements.searchQuery.value.trim();
    console.log(inputValue);
    const response = await fetchData(KEY, inputValue, page);

    if (inputValue === '') return;

    if (response.data.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }       

    render(response.data.hits);
    simpleLightboxGallery.refresh();    
    buttonOn();

}

async function onClick(e) {
    page += 1;    

    const response = await fetchData(KEY, inputValue, page);
    render(response.data.hits);

    if (response.data.totalHits > 40 && (response.data.totalHits) / 40 < page) {
        Notify.failure(`We're sorry, but you've reached the end of search results.`);
        buttonOff();
        return;
    }
}

function render(items) {
    const listImgCard = items.map((item) => imgTamplates(item)).join('');
    galleryEl.insertAdjacentHTML('beforeend', listImgCard);
}

function buttonOff() {
    loadMoreEl.classList.add('is-hidden');
}

function buttonOn() {
    loadMoreEl.classList.remove('is-hidden');
}