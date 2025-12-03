import api from './api';

export const getStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data.data;
};

export const getCategories = async () => {
  const response = await api.get('/admin/categories');
  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data.data;
};

export const updateOrderStatus = async (id, estado) => {
  const response = await api.patch(`/orders/${id}/status?estado=${estado}`);
  return response.data.data;
};