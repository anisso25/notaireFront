import { handleActions } from '~/utils/redux-actions';
import {
  // Employee
  fetchEmployeesListProcess,
  fetchEmployeesListError,
  fetchEmployeesListSuccess,

  createEmployeeProcess,
  createEmployeeError,
  createEmployeeSuccess,

  updateEmployeeProcess,
  updateEmployeeError,
  updateEmployeeSuccess,

  deleteEmployeeProcess,
  deleteEmployeeError,
  deleteEmployeeSuccess,

} from './actions';

const defaultState = {
  list: [],
  total: 0,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: false,
  inputErrors: [],
};

export default handleActions({

  /* * * * * * * * * *
   * Employees
  * * * * * * * * * */
  /* *
   * List
  * */
  [fetchEmployeesListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchEmployeesListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchEmployeesListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.list = payload?.employees;
    draftState.total = payload?.total;
  },

  /* *
  * Create
  * */
  [createEmployeeProcess]: draftState => {
    draftState.isCreating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [createEmployeeError]: (draftState, { payload }) => {
    draftState.isCreating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [createEmployeeSuccess]: (draftState) => {
    draftState.isCreating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateEmployeeProcess]: draftState => {
    draftState.isUpdating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateEmployeeError]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateEmployeeSuccess]: (draftState) => {
    draftState.isUpdating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Delete
  * */
  [deleteEmployeeProcess]: draftState => {
    draftState.isDeleting = true;
    draftState.error = false;
  },
  [deleteEmployeeError]: (draftState, { payload }) => {
    draftState.isDeleting = false;
    draftState.error = payload;
  },
  [deleteEmployeeSuccess]: (draftState) => {
    draftState.isDeleting = false;
    draftState.error = false;
  },

},
defaultState);
