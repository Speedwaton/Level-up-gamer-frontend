import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import api from '../services/api';

const CartContext = createContext(null);

const CART_KEY = 'carrito';

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.cantidad, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [items]
  );

  const discountPercentage = useMemo(() => {
    if (user?.descuento) {
      return user.descuento;
    }
    return 0;
  }, [user]);

  const discountAmount = useMemo(
    () => (subtotal * discountPercentage) / 100,
    [subtotal, discountPercentage]
  );

  const total = useMemo(
    () => subtotal - discountAmount,
    [subtotal, discountAmount]
  );

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === product.slug
            ? { ...item, cantidad: item.cantidad + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          slug: product.slug,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: quantity
        }
      ];
    });
  };

  const updateQuantity = (slug, quantity) => {
    const safeQuantity = Math.max(1, quantity);
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, cantidad: safeQuantity } : item
      )
    );
  };

  const removeItem = (slug) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async (checkoutData) => {
    if (items.length === 0) {
      return { ok: false, message: 'Tu carrito está vacío' };
    }

    try {
      const response = await api.post('/orders/checkout', {
        user: checkoutData,
        items: items.map(item => ({
          productSlug: item.slug,
          quantity: item.cantidad,
          price: item.precio
        })),
        subtotal: subtotal,
        discount: discountAmount,
        total: total
      });

      if (response.data.ok) {
        clearCart();
        return { 
          ok: true, 
          message: 'Compra realizada exitosamente',
          orderId: response.data.orderId 
        };
      } else {
        return { 
          ok: false, 
          message: response.data.message || 'Error al procesar la compra'
        };
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      return { 
        ok: false, 
        message: error.response?.data?.message || 'Error al procesar la compra' 
      };
    }
  };

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      discountPercentage,
      discountAmount,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      checkout
    }),
    [
      items,
      itemCount,
      subtotal,
      discountPercentage,
      discountAmount,
      total
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de CartProvider');
  }
  return context;
};
