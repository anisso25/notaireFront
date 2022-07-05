import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  // Categories
  fetchCategoriesList,
  fetchCategoriesListProcess,
  fetchCategoriesListError,
  fetchCategoriesListSuccess,

  createCategory,
  createCategoryProcess,
  createCategoryError,
  createCategorySuccess,

  updateCategory,
  updateCategoryProcess,
  updateCategoryError,
  updateCategorySuccess,

  deleteCategory,
  deleteCategoryProcess,
  deleteCategoryError,
  deleteCategorySuccess,

} from './actions';

import * as api from './api';

// Category
export function* fetchCategoriesListSaga({ payload }) {
  yield put(fetchCategoriesListProcess());
  try {
    const { categories: data } = yield call(api.fetchCategoriesList, payload);
    yield put(fetchCategoriesListSuccess({
      categories: data?.rows?.map(item => ({ ...item, key: item.id })) || [],
      total: data?.totalRows,
    }));
  } catch (error) {
    yield put(fetchCategoriesListError(error?.message));
  }
}

export function* createCategorySaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(createCategoryProcess());
  try {
    const { category } = yield call(api.createCategory, data);
    yield put(createCategorySuccess(category));
    if (typeof onSuccess === 'function') {
      onSuccess(category);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(createCategoryError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateCategorySaga({
  payload: {
    id,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateCategoryProcess());
  try {
    const { category } = yield call(api.updateCategory, id, data);
    yield put(updateCategorySuccess(category));
    if (typeof onSuccess === 'function') {
      onSuccess(category);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateCategoryError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* deleteCategorySaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(deleteCategoryProcess());
  try {
    yield call(api.deleteCategory, id);
    yield put(deleteCategorySuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(deleteCategoryError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchCategoriesList, fetchCategoriesListSaga);
  yield takeLatest(createCategory, createCategorySaga);
  yield takeLatest(updateCategory, updateCategorySaga);
  yield takeLatest(deleteCategory, deleteCategorySaga);
}

export default rootSaga;
