import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

// Configuración global de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token JWT en las peticiones
api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('🔐 Token enviado en petición:', config.url);
    } else {
      console.warn('⚠️ No hay token para:', config.url);
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  response => {
    console.log('✅ Respuesta exitosa:', response.config.url, response.data);
    return response;
  },
  error => {
    if (error.response) {
      console.error('❌ Error en respuesta:', {
        url: error.config.url,
        status: error.response.status,
        data: error.response.data
      });
      
      // Si es 401 o 403, el token no es válido o no tiene permisos
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('🚫 Acceso denegado. Token inválido o sin permisos de admin.');
      }
    } else {
      console.error('❌ Error sin respuesta:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api