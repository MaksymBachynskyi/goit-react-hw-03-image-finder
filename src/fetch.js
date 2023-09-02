import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const fetchGet = async function (element, page = 1) {
  const data = await axios.get(
    `?q=${element}&page=${page}&key=38353309-e4de21ca68fdebd8c76b476b8&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.data;
};
