import { createActions } from 'redux-actions';

export const {
  fetchGeneralData,
  fetchGeneralDataProcess,
  fetchGeneralDataError,
  fetchGeneralDataSuccess,

  // Entity
  fetchEntitiesList,
  fetchEntitiesListProcess,
  fetchEntitiesListError,
  fetchEntitiesListSuccess,
} = createActions({
  /* *
   * Fetch General Data
  * */
  FETCH_GENERAL_DATA: () => {},
  FETCH_GENERAL_DATA_PROCESS: () => {},
  FETCH_GENERAL_DATA_ERROR: err => err,
  FETCH_GENERAL_DATA_SUCCESS: data => data,

  /* *
   * Fetch Entities
  * */
  FETCH_ENTITIES_LIST: params => (params),
  FETCH_ENTITIES_LIST_PROCESS: () => {},
  FETCH_ENTITIES_LIST_ERROR: err => err,
  FETCH_ENTITIES_LIST_SUCCESS: data => data,
});
