import api from './api';

export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data.data;
};

export const getProductsByCategory = async (categoria) => {
  const response = await api.get(`/products/category/${categoria}`);
  return response.data.data;
};

export const searchProducts = async (query) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return response.data.data;
};

// Admin endpoints
export const createProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};