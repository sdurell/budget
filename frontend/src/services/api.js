import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.API_BASE_URL || 'http://localhost:8080/api',
    timeout: 100000, //ms
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;