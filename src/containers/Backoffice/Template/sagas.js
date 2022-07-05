import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  // Template
  fetchTemplatesList,
  fetchTemplatesListProcess,
  fetchTemplatesListError,
  fetchTemplatesListSuccess,

  createTemplate,
  createTemplateProcess,
  createTemplateError,
  createTemplateSuccess,

  updateTemplate,
  updateTemplateProcess,
  updateTemplateError,
  updateTemplateSuccess,

  deleteTemplate,
  deleteTemplateProcess,
  deleteTemplateError,
  deleteTemplateSuccess,

} from './actions';

import * as api from './api';

// Template
export function* fetchTemplatesListSaga({ payload }) {
  yield put(fetchTemplatesListProcess());
  try {
    const { templates: data } = yield call(api.fetchTemplatesList, payload);
    yield put(fetchTemplatesListSuccess({
      templates: data?.rows?.map(item => ({ ...item, key: item.id })) || [],
      total: data?.totalRows,
    }));
  } catch (error) {
    yield put(fetchTemplatesListError(error?.message));
  }
}

export function* createTemplateSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(createTemplateProcess());
  try {
    const { template } = yield call(api.createTemplate, data);
    yield put(createTemplateSuccess(template));
    if (typeof onSuccess === 'function') {
      onSuccess(template);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(createTemplateError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateTemplateSaga({
  payload: {
    id,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateTemplateProcess());
  try {
    const { template } = yield call(api.updateTemplate, id, data);
    yield put(updateTemplateSuccess(template));
    if (typeof onSuccess === 'function') {
      onSuccess(template);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateTemplateError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* deleteTemplateSaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(deleteTemplateProcess());
  try {
    yield call(api.deleteTemplate, id);
    yield put(deleteTemplateSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(deleteTemplateError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchTemplatesList, fetchTemplatesListSaga);
  yield takeLatest(createTemplate, createTemplateSaga);
  yield takeLatest(updateTemplate, updateTemplateSaga);
  yield takeLatest(deleteTemplate, deleteTemplateSaga);
}

export default rootSaga;
