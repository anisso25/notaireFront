import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  login,
  loginProcess,
  loginError,
  loginSuccess,

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
  // updateProfileProcess,
  // updateProfileError,
  // updateProfileSuccess,

  fetchOfficeInfo,
  fetchOfficeInfoProcess,
  fetchOfficeInfoError,
  fetchOfficeInfoSuccess,

  updateOfficeInfo,
  updateOfficeInfoProcess,
  updateOfficeInfoError,
  updateOfficeInfoSuccess,
} from './actions';
import { fetchEntitiesList, fetchGeneralData } from '~/containers/Common/HomePage/actions';

import * as api from './api';

/**
 *
 * Auth sagas
 */
export function* loginSaga({ payload }) {
  yield put(loginProcess());
  try {
    const { user } = yield call(api.login, payload);
    yield put(loginSuccess(user));
    yield put(fetchEntitiesList());
    yield put(fetchGeneralData());
  } catch (error) {
    yield put(loginError(error?.message));
  }
}

export function* fetchProfileSaga() {
  yield put(fetchProfileProcess());
  try {
    const { user } = yield call(api.fetchProfile);
    yield put(fetchProfileSuccess(user));
  } catch (error) {
    yield put(fetchProfileError(error?.message));
  }
}

export function* forgetPasswordSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(forgetPasswordProcess());
  try {
    yield call(api.forgetPassword, data);
    yield put(forgetPasswordSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    yield put(forgetPasswordError(error?.message));
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }
}

export function* resetPasswordSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(resetPasswordProcess());
  try {
    yield call(api.resetPassword, data);
    yield put(resetPasswordSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    yield put(resetPasswordError(error?.message));
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }
}

export function* updateProfileSaga() {
  yield put(loginProcess());
  try {
    const { user } = yield call(api.fetchProfile);
    yield put(fetchProfileSuccess(user));
  } catch (error) {
    yield put(fetchProfileError(error?.message));
  }
}

export function* fetchOfficeInfoSaga() {
  yield put(fetchOfficeInfoProcess());
  try {
    const { office } = yield call(api.fetchOfficeInfo);
    yield put(fetchOfficeInfoSuccess(office));
  } catch (error) {
    yield put(fetchOfficeInfoError(error?.message));
  }
}

export function* updateOfficeInfoSaga({ payload: { data } }) {
  yield put(updateOfficeInfoProcess());
  try {
    const { office } = yield call(api.updateOfficeInfo, data);
    yield put(updateOfficeInfoSuccess(office));
  } catch (error) {
    yield put(updateOfficeInfoError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(forgetPassword, forgetPasswordSaga);
  yield takeLatest(resetPassword, resetPasswordSaga);
  yield takeLatest(fetchProfile, fetchProfileSaga);
  yield takeLatest(updateProfile, updateProfileSaga);
  yield takeLatest(fetchOfficeInfo, fetchOfficeInfoSaga);
  yield takeLatest(updateOfficeInfo, updateOfficeInfoSaga);
}

export default rootSaga;
