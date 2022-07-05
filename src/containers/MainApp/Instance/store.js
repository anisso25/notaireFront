import { handleActions } from '~/utils/redux-actions';
import {
  // Instances
  fetchInstancesListProcess,
  fetchInstancesListError,
  fetchInstancesListSuccess,

  autocompleteInstancesListProcess,
  autocompleteInstancesListError,
  autocompleteInstancesListSuccess,

  createInstanceProcess,
  createInstanceError,
  createInstanceSuccess,

  updateInstanceProcess,
  updateInstanceError,
  updateInstanceSuccess,

  deleteInstanceProcess,
  deleteInstanceError,
  deleteInstanceSuccess,

} from './actions';

const defaultState = {
  list: {
    data: [],
    total: 0,
  },
  isFetching: false,
  isAutoCompleting: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: false,
  inputErrors: [],
};

export default handleActions({

  /* * * * * * * * * *
   * Instances
  * * * * * * * * * */
  /* *
   * List
  * */
  [fetchInstancesListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchInstancesListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchInstancesListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.list = {
      data: payload?.list,
      total: payload?.total,
    };
  },

  /* *
   * Auto complete
  * */
  [autocompleteInstancesListProcess]: draftState => {
    draftState.isAutoCompleting = true;
    draftState.error = false;
  },
  [autocompleteInstancesListError]: (draftState, { payload }) => {
    draftState.isAutoCompleting = false;
    draftState.error = payload;
  },
  [autocompleteInstancesListSuccess]: (draftState) => {
    draftState.isAutoCompleting = false;
    draftState.error = false;
  },

  /* *
  * Create
  * */
  [createInstanceProcess]: draftState => {
    draftState.isCreating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [createInstanceError]: (draftState, { payload }) => {
    draftState.isCreating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [createInstanceSuccess]: (draftState) => {
    draftState.isCreating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateInstanceProcess]: draftState => {
    draftState.isUpdating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateInstanceError]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateInstanceSuccess]: (draftState) => {
    draftState.isUpdating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Delete
  * */
  [deleteInstanceProcess]: draftState => {
    draftState.isDeleting = true;
    draftState.error = false;
  },
  [deleteInstanceError]: (draftState, { payload }) => {
    draftState.isDeleting = false;
    draftState.error = payload;
  },
  [deleteInstanceSuccess]: (draftState) => {
    draftState.isDeleting = false;
    draftState.error = false;
  },

},
defaultState);
