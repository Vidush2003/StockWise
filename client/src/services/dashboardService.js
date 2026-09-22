import API from './api';

export const getDashboardSummary = async () => {
  const response = await API.get('/dashboard/summary');
  return response.data;
};

export const getCategoryStats = async () => {
  const response = await API.get('/dashboard/category-stats');
  return response.data;
};

export const getStockMovement = async () => {
  const response = await API.get('/dashboard/stock-movement');
  return response.data;
};

export const getLowStockAlerts = async () => {
  const response = await API.get('/dashboard/low-stock-alerts');
  return response.data;
};
