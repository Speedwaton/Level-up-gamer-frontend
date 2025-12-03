import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

// Configuración global de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el email del usuario en las peticiones
api.interceptors.request.use(
  config => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      config.headers['X-User-Email'] = userEmail;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api