import API from './api';

export const recordStockIn = async (productId, quantity, reason) => {
  const response = await API.post(`/products/${productId}/stock-in`, { quantity, reason });
  return response.data;
};

export const recordStockOut = async (productId, quantity, reason) => {
  const response = await API.post(`/products/${productId}/stock-out`, { quantity, reason });
  return response.data;
};

export const getTransactions = async (params = {}) => {
  const response = await API.get('/transactions', { params });
  return response.data;
};
