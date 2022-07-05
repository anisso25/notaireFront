import { createActions } from 'redux-actions';

export const {
  // Employee
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

} = createActions({
  /* * * * * * * * * *
   * Employees
  * * * * * * * * * */
  /* *
   * List
  * */
  FETCH_EMPLOYEES_LIST: params => (params),
  FETCH_EMPLOYEES_LIST_PROCESS: () => {},
  FETCH_EMPLOYEES_LIST_ERROR: err => err,
  FETCH_EMPLOYEES_LIST_SUCCESS: data => data,

  /* *
   * Create
  * */
  CREATE_EMPLOYEE: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  CREATE_EMPLOYEE_PROCESS: () => {},
  CREATE_EMPLOYEE_ERROR: err => err,
  CREATE_EMPLOYEE_SUCCESS: data => data,

  /* *
   * Update
  * */
  UPDATE_EMPLOYEE: (id, data, onSuccess, onFailure) => ({
    id,
    data,
    onSuccess,
    onFailure,
  }),
  UPDATE_EMPLOYEE_PROCESS: () => {},
  UPDATE_EMPLOYEE_ERROR: err => err,
  UPDATE_EMPLOYEE_SUCCESS: data => data,

  /* *
   * Delete
  * */
  DELETE_EMPLOYEE: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  DELETE_EMPLOYEE_PROCESS: () => {},
  DELETE_EMPLOYEE_ERROR: err => err,
  DELETE_EMPLOYEE_SUCCESS: data => data,
});
