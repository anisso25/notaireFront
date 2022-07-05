import axios from '~/lib/axios';

// Employee
export const fetchEmployeesList = async (params) => {
  const filters = Object.entries(params || {}).map(
    ([key, val]) => `${key}=${encodeURIComponent(val)}`,
  ).join('&');
  return axios(`/employees?${filters}`, { method: 'get' });
};

export const createEmployee = async (data) => (
  axios('/employees/create', { method: 'post', data })
);

export const updateEmployee = async (id, data) => (
  axios(`/employees/employee/${id}`, { method: 'put', data })
);

export const deleteEmployee = async (id) => (
  axios(`/employees/employee/${id}`, { method: 'delete' })
);
