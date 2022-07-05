import { createActions } from 'redux-actions';

export const {
  // Category
  fetchTemplatesList,
  fetchTemplatesListProcess,
  fetchTemplatesListError,
  fetchTemplatesListSuccess,

  createTemplate,
  createTemplateProcess,
  createTemplateError,
  createTemplateSuccess,

  updateTemplate,
  updateTemplateProcess,
  updateTemplateError,
  updateTemplateSuccess,

  deleteTemplate,
  deleteTemplateProcess,
  deleteTemplateError,
  deleteTemplateSuccess,

} = createActions({
  /* * * * * * * * * *
   * Template
  * * * * * * * * * */
  /* *
   * List
  * */
  FETCH_TEMPLATES_LIST: params => (params),
  FETCH_TEMPLATES_LIST_PROCESS: () => {},
  FETCH_TEMPLATES_LIST_ERROR: err => err,
  FETCH_TEMPLATES_LIST_SUCCESS: data => data,

  /* *
   * Create
  * */
  CREATE_TEMPLATE: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  CREATE_TEMPLATE_PROCESS: () => {},
  CREATE_TEMPLATE_ERROR: err => err,
  CREATE_TEMPLATE_SUCCESS: data => data,

  /* *
   * Update
  * */
  UPDATE_TEMPLATE: (id, data, onSuccess, onFailure) => ({
    id,
    data,
    onSuccess,
    onFailure,
  }),
  UPDATE_TEMPLATE_PROCESS: () => {},
  UPDATE_TEMPLATE_ERROR: err => err,
  UPDATE_TEMPLATE_SUCCESS: data => data,

  /* *
   * Delete
  * */
  DELETE_TEMPLATE: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  DELETE_TEMPLATE_PROCESS: () => {},
  DELETE_TEMPLATE_ERROR: err => err,
  DELETE_TEMPLATE_SUCCESS: data => data,
});
