import { handleActions } from '~/utils/redux-actions';
import {
  // Template
  fetchTemplatesListProcess,
  fetchTemplatesListError,
  fetchTemplatesListSuccess,

  createTemplateProcess,
  createTemplateError,
  createTemplateSuccess,

  updateTemplateProcess,
  updateTemplateError,
  updateTemplateSuccess,

  deleteTemplateProcess,
  deleteTemplateError,
  deleteTemplateSuccess,

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
   * Template
  * * * * * * * * * */
  /* *
   * List
  * */
  [fetchTemplatesListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchTemplatesListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchTemplatesListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.list = payload?.templates;
    draftState.total = payload?.total;
  },

  /* *
  * Create
  * */
  [createTemplateProcess]: draftState => {
    draftState.isCreating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [createTemplateError]: (draftState, { payload }) => {
    draftState.isCreating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [createTemplateSuccess]: (draftState) => {
    draftState.isCreating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateTemplateProcess]: draftState => {
    draftState.isUpdating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateTemplateError]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateTemplateSuccess]: (draftState) => {
    draftState.isUpdating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Delete
  * */
  [deleteTemplateProcess]: draftState => {
    draftState.isDeleting = true;
    draftState.error = false;
  },
  [deleteTemplateError]: (draftState, { payload }) => {
    draftState.isDeleting = false;
    draftState.error = payload;
  },
  [deleteTemplateSuccess]: (draftState) => {
    draftState.isDeleting = false;
    draftState.error = false;
  },

},
defaultState);
