import { createActions } from 'redux-actions';

export const {
  login,
  loginProcess,
  loginError,
  loginSuccess,

  logout,

  forgetPassword,
  forgetPasswordProcess,
  forgetPasswordError,
  forgetPasswordSuccess,

  resetPassword,
  resetPasswordProcess,
  resetPasswordError,
  resetPasswordSuccess,

  fetchProfile,
  fetchProfileProcess,
  fetchProfileError,
  fetchProfileSuccess,

  updateProfile,
  updateProfileProcess,
  updateProfileError,
  updateProfileSuccess,

  fetchOfficeInfo,
  fetchOfficeInfoProcess,
  fetchOfficeInfoError,
  fetchOfficeInfoSuccess,

  updateOfficeInfo,
  updateOfficeInfoProcess,
  updateOfficeInfoError,
  updateOfficeInfoSuccess,

} = createActions({
  /* *
   * Login
  * */
  LOGIN: user => (user),
  LOGIN_PROCESS: () => {},
  LOGIN_ERROR: err => err,
  LOGIN_SUCCESS: data => data,

  /* *
   * Logout
  * */
  LOGOUT: () => {},

  /* *
   * Forget Password
  * */
  FORGET_PASSWORD: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  FORGET_PASSWORD_PROCESS: () => {},
  FORGET_PASSWORD_ERROR: err => err,
  FORGET_PASSWORD_SUCCESS: data => data,

  /* *
   * Reset Password
  * */
  RESET_PASSWORD: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  RESET_PASSWORD_PROCESS: () => {},
  RESET_PASSWORD_ERROR: err => err,
  RESET_PASSWORD_SUCCESS: data => data,

  /* *
   * Get profile
  * */
  FETCH_PROFILE: () => {},
  FETCH_PROFILE_PROCESS: () => {},
  FETCH_PROFILE_ERROR: err => err,
  FETCH_PROFILE_SUCCESS: user => user,

  /* *
   * Get profile
  * */
  UPDATE_PROFILE: () => {},
  UPDATE_PROFILE_PROCESS: () => {},
  UPDATE_PROFILE_ERROR: err => err,
  UPDATE_PROFILE_SUCCESS: user => user,

  /* *
   * Get office info
  * */
  FETCH_OFFICE_INFO: () => {},
  FETCH_OFFICE_INFO_PROCESS: () => {},
  FETCH_OFFICE_INFO_ERROR: err => err,
  FETCH_OFFICE_INFO_SUCCESS: office => office,

  /* *
    * Get office info
  * */
  UPDATE_OFFICE_INFO: (data) => ({ data }),
  UPDATE_OFFICE_INFO_PROCESS: () => {},
  UPDATE_OFFICE_INFO_ERROR: err => err,
  UPDATE_OFFICE_INFO_SUCCESS: office => office,

});
