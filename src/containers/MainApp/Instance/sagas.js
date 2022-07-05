import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  // Instances
  fetchInstancesList,
  fetchInstancesListProcess,
  fetchInstancesListError,
  fetchInstancesListSuccess,

  autocompleteInstancesList,
  autocompleteInstancesListProcess,
  autocompleteInstancesListError,
  autocompleteInstancesListSuccess,

  createInstance,
  createInstanceProcess,
  createInstanceError,
  createInstanceSuccess,

  updateInstance,
  updateInstanceProcess,
  updateInstanceError,
  updateInstanceSuccess,

  deleteInstance,
  deleteInstanceProcess,
  deleteInstanceError,
  deleteInstanceSuccess,

} from './actions';

import * as api from './api';
import { scrollTop } from '~/helpers/misc';

const getMappedRelationship = (rel, idx = 0) => {
  const uidRel = Date.now() + idx;
  return {
    ...rel,
    instanceId: rel?.instance?.id,
    relationshipId: rel?.id,
    EntityRelationshipId: rel?.EntityRelationship?.id,
    id: uidRel,
    key: `record_relationship_${rel?.id}_${uidRel}`,
  };
};

const getMappedInstance = (item, index = 0) => {
  const uid = Date.now() + index;
  const temp = {
    ...item,
    relationshipTos: item?.relationshipTos?.map(getMappedRelationship),
    relationshipFroms: item?.relationshipFroms?.map(getMappedRelationship),
    instanceId: item?.id,
    id: uid,
    key: `record_${item.id}_${uid}`,
  };
  return temp;
};

// Instance
export function* fetchInstancesListSaga({ payload }) {
  yield put(fetchInstancesListProcess());
  try {
    const { instance: data } = yield call(api.fetchInstancesList, payload);
    yield put(fetchInstancesListSuccess({
      list: data?.rows?.map(getMappedInstance) || [],
      total: data?.totalRows,
    }));
    scrollTop();
  } catch (error) {
    yield put(fetchInstancesListError(error?.message));
  }
}

export function* autocompleteInstancesListSaga({ payload: { params, onSuccess, onFailure } }) {
  yield put(autocompleteInstancesListProcess());
  try {
    const { instance } = yield call(api.fetchInstancesList, params);

    const data = {
      list: instance?.rows?.map(getMappedInstance) || [],
      total: instance?.totalRows,
    };

    yield put(autocompleteInstancesListSuccess(data));
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }

    yield put(autocompleteInstancesListError(error?.message));
  }
}

export function* createInstanceSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(createInstanceProcess());
  try {
    const { instance } = yield call(api.createInstance, data);
    yield put(createInstanceSuccess(getMappedInstance(instance)));
    if (typeof onSuccess === 'function') {
      onSuccess(getMappedInstance(instance));
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(createInstanceError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateInstanceSaga({
  payload: {
    id,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateInstanceProcess());
  try {
    const { instance } = yield call(api.updateInstance, id, data);
    yield put(updateInstanceSuccess(getMappedInstance(instance)));
    if (typeof onSuccess === 'function') {
      onSuccess(getMappedInstance(instance));
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateInstanceError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* deleteInstanceSaga({ payload: { params, onSuccess, onFailure } }) {
  yield put(deleteInstanceProcess());
  try {
    yield call(api.deleteInstance, params);
    yield put(deleteInstanceSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(deleteInstanceError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchInstancesList, fetchInstancesListSaga);
  yield takeLatest(autocompleteInstancesList, autocompleteInstancesListSaga);
  yield takeLatest(createInstance, createInstanceSaga);
  yield takeLatest(updateInstance, updateInstanceSaga);
  yield takeLatest(deleteInstance, deleteInstanceSaga);
}

export default rootSaga;
