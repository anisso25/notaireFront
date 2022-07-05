import { createActions } from 'redux-actions';

export const {
  // Category
  fetchCategoriesList,
  fetchCategoriesListProcess,
  fetchCategoriesListError,
  fetchCategoriesListSuccess,

  createCategory,
  createCategoryProcess,
  createCategoryError,
  createCategorySuccess,

  updateCategory,
  updateCategoryProcess,
  updateCategoryError,
  updateCategorySuccess,

  deleteCategory,
  deleteCategoryProcess,
  deleteCategoryError,
  deleteCategorySuccess,

} = createActions({
  /* * * * * * * * * *
   * Category
  * * * * * * * * * */
  /* *
   * List
  * */
  FETCH_CATEGORIES_LIST: params => (params),
  FETCH_CATEGORIES_LIST_PROCESS: () => {},
  FETCH_CATEGORIES_LIST_ERROR: err => err,
  FETCH_CATEGORIES_LIST_SUCCESS: data => data,

  /* *
   * Create
  * */
  CREATE_CATEGORY: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  CREATE_CATEGORY_PROCESS: () => {},
  CREATE_CATEGORY_ERROR: err => err,
  CREATE_CATEGORY_SUCCESS: data => data,

  /* *
   * Update
  * */
  UPDATE_CATEGORY: (id, data, onSuccess, onFailure) => ({
    id,
    data,
    onSuccess,
    onFailure,
  }),
  UPDATE_CATEGORY_PROCESS: () => {},
  UPDATE_CATEGORY_ERROR: err => err,
  UPDATE_CATEGORY_SUCCESS: data => data,

  /* *
   * Delete
  * */
  DELETE_CATEGORY: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  DELETE_CATEGORY_PROCESS: () => {},
  DELETE_CATEGORY_ERROR: err => err,
  DELETE_CATEGORY_SUCCESS: data => data,
});
