import axios from '~/lib/axios';

// Instance
export const fetchInstancesList = async (params) => {
  const filters = Object.entries(params || {}).map(
    ([key, val]) => `${key}=${encodeURIComponent(val)}`,
  ).join('&');
  return axios(`/instances?${filters}`, { method: 'get' });
};

export const createInstance = async (data) => (
  axios('/instances/create', { method: 'post', data })
);

export const updateInstance = async (id, data) => (
  axios(`/instances/instance/${id}`, { method: 'put', data })
);

export const deleteInstance = async (params) => (
  axios(
    `/instances/instance/${params?.id}`,
    { method: 'delete' },
  )
);
