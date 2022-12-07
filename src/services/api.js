import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333' //put your api url
})

export { api }