export function imgTamplates ({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) {
    return `<a class="gallery-link" href="${largeImageURL}">
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
            </a>`
}