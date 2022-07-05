import {
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects';
import {
  fetchGeneralData,
  fetchGeneralDataProcess,
  fetchGeneralDataError,
  fetchGeneralDataSuccess,

  // Entities
  fetchEntitiesList,
  fetchEntitiesListProcess,
  fetchEntitiesListError,
  fetchEntitiesListSuccess,
} from './actions';

import * as api from './api';

export function* fetchGeneralDataSaga() {
  yield put(fetchGeneralDataProcess());
  try {
    const { success, ...data } = yield call(api.fetchGeneralData);
    yield put(fetchGeneralDataSuccess(data));
  } catch (error) {
    yield put(fetchGeneralDataError(error?.message));
  }
}

// Entity
export function* fetchEntitiesListSaga() {
  yield put(fetchEntitiesListProcess());
  try {
    const { wilayas, countries } = yield select(state => state.general);
    const { entities } = yield call(api.fetchEntitiesList);
    const temp = entities.map(entity => ({
      ...entity,
      attributes: entity?.attributes?.map(attr => {
        switch (attr.type) {
          case 'COUNTRY':
            return {
              ...attr,
              values: countries,
            };
          case 'WILAYA':
            return {
              ...attr,
              values: wilayas,
            };
          default:
            return attr;
        }
      })?.sort((a, b) => a.id - b.id),
    }));
    yield put(fetchEntitiesListSuccess(temp));
  } catch (error) {
    yield put(fetchEntitiesListError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchGeneralData, fetchGeneralDataSaga);
  yield takeLatest(fetchEntitiesList, fetchEntitiesListSaga);
}

export default rootSaga;
