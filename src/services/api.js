import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apipostagens.builderseunegocioonline.com.br'
})

export { api };