import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.147:3333' //IP de Casa
    baseURL: 'http://192.168.8.65:3333' //IP da SUMIG
})

export { api };