// Función para decodificar el token JWT y ver su contenido
export const debugToken = () => {
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    console.log('No hay token en sessionStorage');
    return;
  }

  try {
    // Decodificar el payload del JWT (parte del medio)
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    
    console.log('Token decodificado:', decoded);
    console.log('Email:', decoded.sub);
    console.log('Es Admin:', decoded.admin);
    console.log('Expira:', new Date(decoded.exp * 1000).toLocaleString());
    
    return decoded;
  } catch (error) {
    console.error('Error al decodificar token:', error);
  }
};

// Para usar en consola del navegador:
// import { debugToken } from './utils/debugToken';
// debugToken();
