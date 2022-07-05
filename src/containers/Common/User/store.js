import { handleActions } from '~/utils/redux-actions';
import {
  loginProcess,
  loginError,
  loginSuccess,

  logout,

  forgetPasswordProcess,
  forgetPasswordError,
  forgetPasswordSuccess,

  resetPasswordProcess,
  resetPasswordError,
  resetPasswordSuccess,

  fetchProfileProcess,
  fetchProfileError,
  fetchProfileSuccess,

  fetchOfficeInfoProcess,
  fetchOfficeInfoError,
  fetchOfficeInfoSuccess,

  updateOfficeInfoProcess,
  updateOfficeInfoError,
  updateOfficeInfoSuccess,

} from './actions';

const defaultState = {
  auth: {
    isLoading: false,
    error: false,
    isLogged: false,
    token: undefined,
  },
  userInfo: {
    isFetching: false,
    isUpdating: false,
    error: false,
    inputErrors: [],
    data: {},
  },
};

export default handleActions({

  /* *
   * Login
  * */
  [loginProcess]: draftState => {
    draftState.auth.isLoading = true;
    draftState.auth.error = false;
  },
  [loginError]: (draftState, { payload }) => {
    draftState.auth.isLoading = false;
    draftState.auth.error = payload;
  },
  [loginSuccess]: (draftState, { payload }) => {
    const { token, ...rest } = payload;
    draftState.auth.isLoading = false;
    draftState.auth.error = false;
    draftState.auth.isLogged = true;
    draftState.auth.token = token;
    draftState.userInfo.data = rest;
  },

  /* *
   * Logout
  * */
  [logout]: draftState => {
    draftState.auth = defaultState.auth;
  },

  /* *
   * Forget Password
  * */

  [forgetPasswordProcess]: draftState => {
    draftState.auth.isLoading = true;
    draftState.auth.error = false;
  },
  [forgetPasswordError]: (draftState, { payload }) => {
    draftState.auth.isLoading = false;
    draftState.auth.error = payload;
  },
  [forgetPasswordSuccess]: draftState => {
    draftState.auth.isLoading = false;
    draftState.auth.error = false;
  },

  /* *
  * Reset Password
  * */

  [resetPasswordProcess]: draftState => {
    draftState.auth.isLoading = true;
    draftState.auth.error = false;
  },
  [resetPasswordError]: (draftState, { payload }) => {
    draftState.auth.isLoading = false;
    draftState.auth.error = payload;
  },
  [resetPasswordSuccess]: draftState => {
    draftState.auth.isLoading = false;
    draftState.auth.error = false;
  },

  /* *
  * Fetch Profile
  * */
  [fetchProfileProcess]: draftState => {
    draftState.userInfo.isFetching = true;
    draftState.userInfo.error = false;
  },
  [fetchProfileError]: (draftState, { payload }) => {
    draftState.userInfo.isFetching = false;
    draftState.userInfo.error = payload;
  },
  [fetchProfileSuccess]: (draftState, { payload }) => {
    draftState.userInfo.isFetching = false;
    draftState.userInfo.error = false;
    draftState.userInfo.data = payload;
  },

  /* *
  * Fetch Office info
  * */
  [fetchOfficeInfoProcess]: draftState => {
    draftState.userInfo.isFetching = true;
    draftState.userInfo.error = false;
  },
  [fetchOfficeInfoError]: (draftState, { payload }) => {
    draftState.userInfo.isFetching = false;
    draftState.userInfo.error = payload;
  },
  [fetchOfficeInfoSuccess]: (draftState, { payload }) => {
    draftState.userInfo.isFetching = false;
    draftState.userInfo.error = false;
    draftState.userInfo.data.Office = payload;
  },

  /* *
  * Update Office info
  * */
  [updateOfficeInfoProcess]: draftState => {
    draftState.userInfo.isUpdating = true;
    draftState.userInfo.error = false;
    draftState.userInfo.inputErrors = [];
  },
  [updateOfficeInfoError]: (draftState, { payload }) => {
    draftState.userInfo.isUpdating = false;
    draftState.userInfo.error = payload?.message;
    draftState.userInfo.inputErrors = payload?.inputErrors;
  },
  [updateOfficeInfoSuccess]: (draftState, { payload }) => {
    draftState.userInfo.isUpdating = false;
    draftState.userInfo.error = false;
    draftState.userInfo.data.Office = payload;
    draftState.userInfo.inputErrors = [];
  },

},
defaultState);
