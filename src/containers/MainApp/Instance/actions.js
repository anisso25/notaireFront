import { createActions } from 'redux-actions';

export const {
  // Instance
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

} = createActions({
  /* * * * * * * * * *
   * Instances
  * * * * * * * * * */
  /* *
   * List
  * */
  FETCH_INSTANCES_LIST: params => (params),
  FETCH_INSTANCES_LIST_PROCESS: () => {},
  FETCH_INSTANCES_LIST_ERROR: err => err,
  FETCH_INSTANCES_LIST_SUCCESS: data => data,

  /* *
   * Auto Complete
  * */
  AUTOCOMPLETE_INSTANCES_LIST: (params, onSuccess, onFailure) => ({ params, onSuccess, onFailure }),
  AUTOCOMPLETE_INSTANCES_LIST_PROCESS: () => {},
  AUTOCOMPLETE_INSTANCES_LIST_ERROR: err => err,
  AUTOCOMPLETE_INSTANCES_LIST_SUCCESS: data => data,

  /* *
   * Create
  * */
  CREATE_INSTANCE: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  CREATE_INSTANCE_PROCESS: () => {},
  CREATE_INSTANCE_ERROR: err => err,
  CREATE_INSTANCE_SUCCESS: data => data,

  /* *
   * Update
  * */
  UPDATE_INSTANCE: (id, data, onSuccess, onFailure) => ({
    id,
    data,
    onSuccess,
    onFailure,
  }),
  UPDATE_INSTANCE_PROCESS: () => {},
  UPDATE_INSTANCE_ERROR: err => err,
  UPDATE_INSTANCE_SUCCESS: data => data,

  /* *
   * Delete
  * */
  DELETE_INSTANCE: (params, onSuccess, onFailure) => ({ params, onSuccess, onFailure }),
  DELETE_INSTANCE_PROCESS: () => {},
  DELETE_INSTANCE_ERROR: err => err,
  DELETE_INSTANCE_SUCCESS: data => data,
});
