import axios from 'axios'
const token = localStorage.getItem('accessToken')
const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
    headers: {'x-access-token': token, 'Content-Type': 'application/json'}

  });

  export default instance