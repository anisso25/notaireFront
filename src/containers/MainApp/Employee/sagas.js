import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  // Employees
  fetchEmployeesList,
  fetchEmployeesListProcess,
  fetchEmployeesListError,
  fetchEmployeesListSuccess,

  createEmployee,
  createEmployeeProcess,
  createEmployeeError,
  createEmployeeSuccess,

  updateEmployee,
  updateEmployeeProcess,
  updateEmployeeError,
  updateEmployeeSuccess,

  deleteEmployee,
  deleteEmployeeProcess,
  deleteEmployeeError,
  deleteEmployeeSuccess,

} from './actions';

import * as api from './api';

// Employee
export function* fetchEmployeesListSaga({ payload }) {
  yield put(fetchEmployeesListProcess());
  try {
    const { employees: data } = yield call(api.fetchEmployeesList, payload);
    yield put(fetchEmployeesListSuccess({
      employees: data?.rows?.map(item => ({ ...item, key: item.id })) || [],
      total: data?.totalRows,
    }));
  } catch (error) {
    yield put(fetchEmployeesListError(error?.message));
  }
}

export function* createEmployeeSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(createEmployeeProcess());
  try {
    const { employee } = yield call(api.createEmployee, data);
    yield put(createEmployeeSuccess(employee));
    if (typeof onSuccess === 'function') {
      onSuccess(employee);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(createEmployeeError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateEmployeeSaga({
  payload: {
    id,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateEmployeeProcess());
  try {
    const { employee } = yield call(api.updateEmployee, id, data);
    yield put(updateEmployeeSuccess(employee));
    if (typeof onSuccess === 'function') {
      onSuccess(employee);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateEmployeeError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* deleteEmployeeSaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(deleteEmployeeProcess());
  try {
    yield call(api.deleteEmployee, id);
    yield put(deleteEmployeeSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(deleteEmployeeError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchEmployeesList, fetchEmployeesListSaga);
  yield takeLatest(createEmployee, createEmployeeSaga);
  yield takeLatest(updateEmployee, updateEmployeeSaga);
  yield takeLatest(deleteEmployee, deleteEmployeeSaga);
}

export default rootSaga;
