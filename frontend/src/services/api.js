const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.API_BASE_URL || 'http://localhost:8080/api',
    timeout: 100000, //ms
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;




// const API_BASE_URL = "localhost:8080/";

// async function apiFetch(endpoint, options = {}){
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         headers: {
//             "Content-type": "application/json",
//             ...options.headers,
//         },
//         credentials: "include",
//         ...options,
//     });

//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || `Error ${response.status}`);
//     }

//     return response.json();
// }

// export const authenticateLogin = async (username, password) => {
    
//     const response = await apiFetch("/api/auth/login", {
//         method: "POST",
//         body: JSON.stringify({username, password}),
//     });
//     const data = await response.json();

// }