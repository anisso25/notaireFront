import axios from '~/lib/axios';

export const login = async (data) => axios('/users/login', { method: 'POST', data });

export const forgetPassword = async (data) => axios('/toolkit/forgot_password', { method: 'POST', data });

export const resetPassword = async (data) => axios('/toolkit/reset_password', { method: 'POST', data });

export const fetchProfile = async () => axios('/users/profile', { method: 'get' });

export const fetchOfficeInfo = async () => axios('/offices', { method: 'get' });

export const updateOfficeInfo = async (data) => (
  axios('/offices/office', { method: 'put', data })
);
