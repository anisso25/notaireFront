/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import { message } from 'antd';
import { appConfig } from '~/config';
import { logout } from '~/containers/Common/User/actions';
import { scrollTop } from '~/helpers/misc';

const displayedMessages = [];

function messageRender(msg, success, duration = 7) {
  const idx = displayedMessages.indexOf(msg);
  if (idx !== -1) {
    return;
  }
  displayedMessages.push(msg);
  if (success) {
    message.success(msg, duration, () => displayedMessages.splice(idx, 1));
  } else {
    message.error(msg, duration, () => displayedMessages.splice(idx, 1));
  }
}

export const Interceptor = (store) => {
  axios.defaults.baseURL = appConfig.api.url;
  axios.interceptors.request.use(
    (conf) => {
      const { token } = store.getState().user.auth;
      const config = conf;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // config.headers.common['Accept-Language'] = i18n.language;
      return config;
    },
    (error) => Promise.reject(error),
  );
  axios.interceptors.response.use(
    (response) => {
      if (!response.headers['content-type'].includes('application/json')) {
        return response;
      }
      if (!response?.data?.success) {
        return Promise.reject({ status: response?.status, ...response?.data });
      }

      if (response?.data?.message) {
        messageRender(response?.data?.message, true, 10);
      }
      return { status: response?.status, ...response?.data };
    },
    (error) => {
      const { isLogged } = store.getState().user.auth;
      scrollTop();
      // To handle the error codes
      if (![401, 400].includes(error?.response?.status)) {
        messageRender('An error occured, please try again later ...', 0, 10);
        return Promise.reject(error);
      }

      const errorResponse = {
        ...error?.response?.data,
        status: error?.response?.status,
      };

      if (isLogged && error?.response?.status === 401) {
        store.dispatch(logout());
      }

      if (error?.response?.status === 400) {
        if (errorResponse.errors) {
          errorResponse.inputErrors = [];
          errorResponse.errors.forEach(err => {
            errorResponse.inputErrors[err.param] = err.msg;
          });
        }
        delete errorResponse.errors;
      }

      messageRender(error?.response?.data?.message, false, 10);
      return Promise.reject(errorResponse);
    },
  );
};

export default axios;
