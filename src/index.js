import { getImages } from './api/images.js';
//import { getHits } from './api/images.js';
import Notiflix from 'notiflix';
const List = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
//const bth = document.querySelector('button');
const bth = document.querySelector('.load-more');
const input = document.querySelector('input');

let page = 1;
bth.style.display = 'none';

const onInput = async e => {
  e.preventDefault();
  try {
    page = 1;
    const { hits: res, totalHits } = await getImages({
      q: e.target.elements.searchQuery.value,
      page: page,
    });
    // console.log(res);
    // const total = await getHits({
    //   q: input.value,
    //   page: page,
    // });
    // console.log(total);
    List.insertAdjacentHTML('afterbegin', create(res));
    bth.style.display = 'block';
    if (res.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      bth.style.display = 'none';
    } else {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    //create(res);
  } catch (error) {
    console.log(error.message);
  }
};

bth.addEventListener('click', onclickLoad);

async function onclickLoad() {
  try {
    page++;
    const { hits: res, totalHits } = await getImages({
      q: input.value,
      page: page,
    });
    console.log(res);
    //hg
    List.insertAdjacentHTML('beforeend', create(res));
    //console.log(res.totalHits);

    if (page * 40 >= totalHits) {
      bth.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    // console.log(total.totalHits);
  } catch (error) {
    console.log(error.message);
  }
}

form.addEventListener('submit', onInput);
//onInput();
function create(arr) {
  const a = arr.map(createImg).join('');
  return a;
  //List.insertAdjacentHTML('afterbegin', a);
}
function createImg(item) {
  const markup = `<div class="photo-card">
      <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width='350' height='250' />
      <div class="info">
        <p class="info-item">
        Likes <b > ${item.likes}</b>
        </p>
        <p class="info-item">
         Views <b > ${item.views}</b>
        </p>
        <p class="info-item">
        Comments  <b > ${item.comments}</b>
        </p>
        <p class="info-item">
        Downloads  <b> ${item.downloads}</b>
        </p>
      </div>
    </div>
  `;
  //`<li><img src="${item.largeImageURL}"/></li>`;
  return markup;
}
