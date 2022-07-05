import { handleActions } from '~/utils/redux-actions';
import {
  // Documents
  fetchDocumentsListProcess,
  fetchDocumentsListError,
  fetchDocumentsListSuccess,

  fetchDocumentProcess,
  fetchDocumentError,
  fetchDocumentSuccess,

  createDocumentProcess,
  createDocumentError,
  createDocumentSuccess,

  updateDocumentProcess,
  updateDocumentError,
  updateDocumentSuccess,

  deleteDocumentProcess,
  deleteDocumentError,
  deleteDocumentSuccess,

  finalizeDocumentProcess,
  finalizeDocumentError,
  finalizeDocumentSuccess,

  duplicateDocumentProcess,
  duplicateDocumentError,
  duplicateDocumentSuccess,

  // Attached files
  addAttachedFileProcess,
  addAttachedFileError,
  addAttachedFileSuccess,

  updateAttachedFileProcess,
  updateAttachedFileError,
  updateAttachedFileSuccess,

  getAttachedFileProcess,
  getAttachedFileError,
  getAttachedFileSuccess,

  deleteAttachedFileProcess,
  deleteAttachedFileError,
  deleteAttachedFileSuccess,

} from './actions';

const defaultState = {
  list: [],
  total: 0,
  details: null,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFinalizing: false,
  isDuplicating: false,

  isAddingAttachedFile: false,
  isUpdatingAttachedFile: false,
  isGettingAttachedFile: false,
  isDeletingAttachedFile: false,
  error: false,
  inputErrors: [],
};

export default handleActions({

  /* * * * * * * * * *
   * Documents
  * * * * * * * * * */
  /* *
   * List
  * */
  [fetchDocumentsListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchDocumentsListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchDocumentsListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.list = payload?.list;
    draftState.total = payload?.total;
  },

  /* *
   * Get document info
  * */

  [fetchDocumentProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
    draftState.details = null;
  },
  [fetchDocumentError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
    draftState.details = null;
  },
  [fetchDocumentSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.details = payload;
  },

  /* *
  * Create
  * */
  [createDocumentProcess]: draftState => {
    draftState.isCreating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [createDocumentError]: (draftState, { payload }) => {
    draftState.isCreating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [createDocumentSuccess]: (draftState) => {
    draftState.isCreating = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateDocumentProcess]: draftState => {
    draftState.isUpdating = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateDocumentError]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateDocumentSuccess]: (draftState, { payload }) => {
    draftState.isUpdating = false;
    draftState.error = false;
    draftState.inputErrors = [];
    draftState.details = payload;
  },

  /* *
  * Delete
  * */
  [deleteDocumentProcess]: draftState => {
    draftState.isDeleting = true;
    draftState.error = false;
  },
  [deleteDocumentError]: (draftState, { payload }) => {
    draftState.isDeleting = false;
    draftState.error = payload;
  },
  [deleteDocumentSuccess]: (draftState) => {
    draftState.isDeleting = false;
    draftState.error = false;
  },

  /* *
  * Finalize
  * */
  [finalizeDocumentProcess]: draftState => {
    draftState.isFinalizing = true;
    draftState.error = false;
  },
  [finalizeDocumentError]: (draftState, { payload }) => {
    draftState.isFinalizing = false;
    draftState.error = payload;
  },
  [finalizeDocumentSuccess]: (draftState, { payload }) => {
    draftState.isFinalizing = false;
    draftState.error = false;
    draftState.details = payload;
  },

  /* *
* Duplicate
* */
  [duplicateDocumentProcess]: draftState => {
    draftState.isDuplicating = true;
    draftState.error = false;
  },
  [duplicateDocumentError]: (draftState, { payload }) => {
    draftState.isDuplicating = false;
    draftState.error = payload;
  },
  [duplicateDocumentSuccess]: (draftState, { payload }) => {
    draftState.isDuplicating = false;
    draftState.error = false;
    draftState.details = payload;
  },

  /* * * * * * * * * *
   * Attached file
  * * * * * * * * * */

  /* *
  * Add
  * */
  [addAttachedFileProcess]: draftState => {
    draftState.isAddingAttachedFile = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [addAttachedFileError]: (draftState, { payload }) => {
    draftState.isAddingAttachedFile = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [addAttachedFileSuccess]: (draftState) => {
    draftState.isAddingAttachedFile = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Update
  * */
  [updateAttachedFileProcess]: draftState => {
    draftState.isUpdatingAttachedFile = true;
    draftState.error = false;
    draftState.inputErrors = [];
  },
  [updateAttachedFileError]: (draftState, { payload }) => {
    draftState.isUpdatingAttachedFile = false;
    draftState.error = payload?.message;
    draftState.inputErrors = payload?.inputErrors;
  },
  [updateAttachedFileSuccess]: (draftState) => {
    draftState.isUpdatingAttachedFile = false;
    draftState.error = false;
    draftState.inputErrors = [];
  },

  /* *
  * Get
  * */
  [getAttachedFileProcess]: draftState => {
    draftState.isGettingAttachedFile = true;
    draftState.error = false;
  },
  [getAttachedFileError]: (draftState, { payload }) => {
    draftState.isGettingAttachedFile = false;
    draftState.error = payload;
  },
  [getAttachedFileSuccess]: (draftState) => {
    draftState.isGettingAttachedFile = false;
    draftState.error = false;
  },

  /* *
  * Delete
  * */
  [deleteAttachedFileProcess]: draftState => {
    draftState.isDeletingAttachedFile = true;
    draftState.error = false;
  },
  [deleteAttachedFileError]: (draftState, { payload }) => {
    draftState.isDeletingAttachedFile = false;
    draftState.error = payload;
  },
  [deleteAttachedFileSuccess]: (draftState) => {
    draftState.isDeletingAttachedFile = false;
    draftState.error = false;
  },

},
defaultState);
