import axios from 'axios';
//axios.defaults.baseURL = 'https://pixabay.com/api/';
const pixabelApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36254031-3244b5a015df69bb011d9f95c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    // page: 'page',
  },
});
export const getImages = async params => {
  const { data } = await pixabelApi.get('', { params });
  return data.hits;

  //.then(result => result.data.hits);
};
// export const getHits = async params => {
//   const { data } = await pixabelApi.get('', { params });
//   return data.totalHits;

//   //.then(result => result.data.hits);
// };
