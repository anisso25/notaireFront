import axios from '~/lib/axios';

// Template
export const fetchTemplatesList = async (params) => {
  const filters = Object.entries(params || {}).map(
    ([key, val]) => `${key}=${encodeURIComponent(val)}`,
  ).join('&');
  return axios(`/templates?${filters}`, { method: 'get' });
};

export const createTemplate = async (data) => (
  axios('/templates/create', { method: 'post', data })
);

export const updateTemplate = async (id, data) => (
  axios(`/templates/template/${id}`, { method: 'put', data })
);

export const deleteTemplate = async (id) => (
  axios(`/templates/template/${id}`, { method: 'delete' })
);
