import axios from 'axios';

const BASE_URL = 'https://enrich-time-logger-api.onrender.com/';

export default axios.create({
    baseURL: BASE_URL
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Authorization': '' },
    withCredentials: true
})