import axios from '~/lib/axios';

// Categories
export const fetchCategoriesList = async (params) => {
  const filters = Object.entries(params || {}).map(
    ([key, val]) => `${key}=${encodeURIComponent(val)}`,
  ).join('&');
  return axios(`/categories?${filters}`, { method: 'get' });
};

export const createCategory = async (data) => (
  axios('/categories/create', { method: 'post', data })
);

export const updateCategory = async (id, data) => (
  axios(`/categories/category/${id}`, { method: 'put', data })
);

export const deleteCategory = async (id) => (
  axios(`/categories/category/${id}`, { method: 'delete' })
);
