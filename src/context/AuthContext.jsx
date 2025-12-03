import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const SESSION_KEY = 'usuarioActivo';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      sessionStorage.setItem('userEmail', user.correo);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem('userEmail');
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { ok, admin, user: userData, message } = response.data;

      if (!ok) {
        return { ok: false, message };
      }

      setUser(userData);
      return { ok: true, admin };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        ok: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  const register = async (payload) => {
    try {
      const response = await api.post('/users/register', payload);
      const { ok, message, descuento, user: userData } = response.data;

      if (!ok) {
        return { ok: false, message };
      }

      setUser(userData);
      return { ok: true, descuento };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        ok: false, 
        message: error.response?.data?.message || 'Error al registrar usuario' 
      };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, users, login, register, logout }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
