import { createActions } from 'redux-actions';

export const {
  // Document
  fetchDocumentsList,
  fetchDocumentsListProcess,
  fetchDocumentsListError,
  fetchDocumentsListSuccess,

  fetchDocument,
  fetchDocumentProcess,
  fetchDocumentError,
  fetchDocumentSuccess,

  createDocument,
  createDocumentProcess,
  createDocumentError,
  createDocumentSuccess,

  updateDocument,
  updateDocumentProcess,
  updateDocumentError,
  updateDocumentSuccess,

  deleteDocument,
  deleteDocumentProcess,
  deleteDocumentError,
  deleteDocumentSuccess,

  finalizeDocument,
  finalizeDocumentProcess,
  finalizeDocumentError,
  finalizeDocumentSuccess,

  duplicateDocument,
  duplicateDocumentProcess,
  duplicateDocumentError,
  duplicateDocumentSuccess,

  // Attached files

  addAttachedFile,
  addAttachedFileProcess,
  addAttachedFileError,
  addAttachedFileSuccess,

  updateAttachedFile,
  updateAttachedFileProcess,
  updateAttachedFileError,
  updateAttachedFileSuccess,

  getAttachedFile,
  getAttachedFileProcess,
  getAttachedFileError,
  getAttachedFileSuccess,

  deleteAttachedFile,
  deleteAttachedFileProcess,
  deleteAttachedFileError,
  deleteAttachedFileSuccess,
} = createActions({
  /* * * * * * * * * *
   * Document
  * * * * * * * * * */
  /* *
   * List
  * */
  FETCH_DOCUMENTS_LIST: params => (params),
  FETCH_DOCUMENTS_LIST_PROCESS: () => {},
  FETCH_DOCUMENTS_LIST_ERROR: err => err,
  FETCH_DOCUMENTS_LIST_SUCCESS: data => data,

  /* *
   * Details
  * */
  FETCH_DOCUMENT: docId => (docId),
  FETCH_DOCUMENT_PROCESS: () => {},
  FETCH_DOCUMENT_ERROR: err => err,
  FETCH_DOCUMENT_SUCCESS: data => data,

  /* *
   * Create
  * */
  CREATE_DOCUMENT: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  CREATE_DOCUMENT_PROCESS: () => {},
  CREATE_DOCUMENT_ERROR: err => err,
  CREATE_DOCUMENT_SUCCESS: data => data,

  /* *
   * Update
  * */
  UPDATE_DOCUMENT: (id, data, onSuccess, onFailure) => ({
    id,
    data,
    onSuccess,
    onFailure,
  }),
  UPDATE_DOCUMENT_PROCESS: () => {},
  UPDATE_DOCUMENT_ERROR: err => err,
  UPDATE_DOCUMENT_SUCCESS: data => data,

  /* *
   * Delete
  * */
  DELETE_DOCUMENT: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  DELETE_DOCUMENT_PROCESS: () => {},
  DELETE_DOCUMENT_ERROR: err => err,
  DELETE_DOCUMENT_SUCCESS: data => data,

  /* *
   * Delete
  * */
  FINALIZE_DOCUMENT: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  FINALIZE_DOCUMENT_PROCESS: () => {},
  FINALIZE_DOCUMENT_ERROR: err => err,
  FINALIZE_DOCUMENT_SUCCESS: data => data,

  /* *
  * Delete
  * */
  duplicate_DOCUMENT: (id, onSuccess, onFailure) => ({ id, onSuccess, onFailure }),
  duplicate_DOCUMENT_PROCESS: () => {},
  duplicate_DOCUMENT_ERROR: err => err,
  duplicate_DOCUMENT_SUCCESS: data => data,

  /* * * * * * * * * *
  * Attached files
  * * * * * * * * * */

  ADD_ATTACHED_FILE: (data, onSuccess, onFailure) => ({ data, onSuccess, onFailure }),
  ADD_ATTACHED_FILE_PROCESS: () => {},
  ADD_ATTACHED_FILE_ERROR: err => err,
  ADD_ATTACHED_FILE_SUCCESS: data => data,

  UPDATE_ATTACHED_FILE: (
    filename, data, onSuccess, onFailure,
  ) => ({
    filename, data, onSuccess, onFailure,
  }),
  UPDATE_ATTACHED_FILE_PROCESS: () => {},
  UPDATE_ATTACHED_FILE_ERROR: err => err,
  UPDATE_ATTACHED_FILE_SUCCESS: data => data,

  GET_ATTACHED_FILE: (filename, onSuccess, onFailure) => ({ filename, onSuccess, onFailure }),
  GET_ATTACHED_FILE_PROCESS: () => {},
  GET_ATTACHED_FILE_ERROR: err => err,
  GET_ATTACHED_FILE_SUCCESS: data => data,

  DELETE_ATTACHED_FILE: (filename, onSuccess, onFailure) => ({ filename, onSuccess, onFailure }),
  DELETE_ATTACHED_FILE_PROCESS: () => {},
  DELETE_ATTACHED_FILE_ERROR: err => err,
  DELETE_ATTACHED_FILE_SUCCESS: data => data,
});
