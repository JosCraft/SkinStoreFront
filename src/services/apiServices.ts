import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchAPI(endpoint, { method = 'GET', body = null, params = {} } = {}) {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined // Set Authorization header only if token exists
    };

    try {
        const options = {
            method: method,
            headers: headers,
            url: `${BASE_URL}/${endpoint}`,
            data: body ? body : undefined,
            params: params
        };

        let response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error en la llamada a la API:", error);
        throw error;
    }
}

export const apiService = {
    create: (endpoint, body) => fetchAPI(endpoint, { method: 'POST', body: body }),
    update: (endpoint, id, body) => fetchAPI(`${endpoint}/${id}`, { method: 'PUT', body: body }),
    get: (endpoint) => fetchAPI(`${endpoint}`, { method: 'GET' }),
    delete: (endpoint) => fetchAPI(`${endpoint}`, { method: 'DELETE' }),
};
