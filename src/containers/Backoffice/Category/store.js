import { handleActions } from '~/utils/redux-actions';
import {
  // Category
  fetchCategoriesListProcess,
  fetchCategoriesListError,
  fetchCategoriesListSuccess,

  createCategoryProcess,
  createCategoryError,
  createCategorySuccess,

  updateCategoryProcess,
  updateCategoryError,
  updateCategorySuccess,

  deleteCategoryProcess,
  deleteCategoryError,
  deleteCategorySuccess,

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
   * Category
  * * * * * * * * * */
  /* *
   * List
  * */
  [fetchCategoriesListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchCategoriesListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchCategoriesListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.list = payload?.categories;
    draftState.total = payload?.total;
  },

  /* *
  * Create
  * */
  [createCategoryProcess]: draftState => {
    draftState.isCreating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [createCategoryError]: (draftState, { payload }) => {
    draftState.isCreating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [createCategorySuccess]: (draftState) => {
    draftState.isCreating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateCategoryProcess]: draftState => {
    draftState.isUpdating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateCategoryError]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateCategorySuccess]: (draftState) => {
    draftState.isUpdating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Delete
  * */
  [deleteCategoryProcess]: draftState => {
    draftState.isDeleting = true;
    draftState.error = false;
  },
  [deleteCategoryError]: (draftState, { payload }) => {
    draftState.isDeleting = false;
    draftState.error = payload;
  },
  [deleteCategorySuccess]: (draftState) => {
    draftState.isDeleting = false;
    draftState.error = false;
  },

},
defaultState);
