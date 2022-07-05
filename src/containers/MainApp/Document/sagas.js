/* eslint-disable no-param-reassign */
import {
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects';
import {
  // Documents
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

} from './actions';
import { scrollTop } from '~/helpers/misc';

import * as api from './api';
import { getEntitiesByID } from '~/containers/Common/HomePage/Selectors';
import tableColumnsBuilder from '~/utils/tableColumnsBuilder';

const buildTree = (data, entities) => {
  data.forEach((item) => {
    const EntityId = item?.InstanceRelationship?.Instance?.EntityId || item?.Instance?.EntityId;
    const entity = entities?.[EntityId] || {};
    const { documentInstanceRelationships, ...rest } = item?.InstanceRelationship || item;
    const InstanceRelationshipId = item?.InstanceRelationship ? item?.id : undefined;
    const title = item?.InstanceRelationship?.EntityRelationship?.name || entity?.name;
    item.data = {
      ...rest,
      TemplateEntity: {
        ...entity,
        columns: tableColumnsBuilder(entity?.attributes),
        relationshipTos: entity?.relationshipTos?.map(ent => ({
          ...ent,
          ...entities?.[ent?.EntityId],
          name: ent?.name,
        })),
        relationshipFroms: entity?.relationshipFroms?.map(ent => ({
          ...ent,
          ...entities?.[ent?.EntityId],
          name: ent?.name,
        })),
      },
      title,
      DocumentInstanceId: rest?.id,
      InstanceRelationshipId,
      treeKey: `documentInstance_${rest?.id}_${InstanceRelationshipId || 'root'}`,
    };
    item.title = title;
    item.key = item.data.treeKey;
    if (item.documentInstanceRelationships) {
      item.children = item.documentInstanceRelationships;
      buildTree(item.documentInstanceRelationships, entities);
      delete item.documentInstanceRelationships;
    }
  });
};

function* documentDataHandler(document) {
  const entities = yield select(getEntitiesByID);
  const documentInstances = {};
  document?.documentInstances?.forEach(item => {
    if (!documentInstances[item?.TemplateEntityId]) {
      documentInstances[item?.TemplateEntityId] = [];
    }

    documentInstances[item?.TemplateEntityId].push(item);
    buildTree(
      documentInstances[item?.TemplateEntityId],
      entities,
      0,
    );
  });

  return {
    ...document,
    documentInstances,
  };
}

// Document
export function* fetchDocumentsListSaga({ payload }) {
  yield put(fetchDocumentsListProcess());
  try {
    const { documents } = yield call(api.fetchDocumentsList, payload);
    yield put(fetchDocumentsListSuccess({
      list: documents?.rows?.map(item => ({ ...item, key: item.id })) || [],
      total: documents?.totalRows,
    }));
    scrollTop();
  } catch (error) {
    yield put(fetchDocumentsListError(error?.message));
  }
}

export function* fetchDocumentSaga({ payload }) {
  yield put(fetchDocumentProcess());
  try {
    const { document } = yield call(api.fetchDocument, payload);
    yield put(
      fetchDocumentSuccess(
        yield documentDataHandler(document),
      ),
    );
  } catch (error) {
    yield put(fetchDocumentError(error?.message));
  }
}

export function* createDocumentSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(createDocumentProcess());
  try {
    const { document } = yield call(api.createDocument, data);
    yield put(createDocumentSuccess(document));
    if (typeof onSuccess === 'function') {
      onSuccess(document);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(createDocumentError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateDocumentSaga({
  payload: {
    id,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateDocumentProcess());
  try {
    const { document } = yield call(api.updateDocument, id, data);
    const documentData = yield documentDataHandler(document);
    yield put(
      updateDocumentSuccess(documentData),
    );
    if (typeof onSuccess === 'function') {
      onSuccess(documentData);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateDocumentError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* deleteDocumentSaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(deleteDocumentProcess());
  try {
    yield call(api.deleteDocument, id);
    yield put(deleteDocumentSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(deleteDocumentError(error?.message));
  }
}

export function* finalizeDocumentSaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(finalizeDocumentProcess());
  try {
    const { document } = yield call(api.finalizeDocument, id);
    const data = yield documentDataHandler(document);
    yield put(finalizeDocumentSuccess(data));
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure();
    }
    yield put(finalizeDocumentError(error?.message));
  }
}

export function* duplicateDocumentSaga({ payload: { id, onSuccess, onFailure } }) {
  yield put(duplicateDocumentProcess());
  try {
    const { document } = yield call(api.duplicateDocument, id);
    const data = yield documentDataHandler(document);
    yield put(duplicateDocumentSuccess(data));
    if (typeof onSuccess === 'function') {
      onSuccess(data);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error);
    }
    yield put(duplicateDocumentError(error?.message));
  }
}

export function* addAttachedFileSaga({ payload: { data, onSuccess, onFailure } }) {
  yield put(addAttachedFileProcess());
  try {
    const { file } = yield call(api.addAttachedFile, data);
    yield put(addAttachedFileSuccess(file));
    if (typeof onSuccess === 'function') {
      onSuccess(file);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(addAttachedFileError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* updateAttachedFileSaga({
  payload: {
    filename,
    data,
    onSuccess,
    onFailure,
  },
}) {
  yield put(updateAttachedFileProcess());
  try {
    const { file } = yield call(api.updateAttachedFile, filename, data);
    yield put(updateAttachedFileSuccess(file));
    if (typeof onSuccess === 'function') {
      onSuccess(file);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error?.inputErrors);
    }
    yield put(updateAttachedFileError({
      message: error?.message,
      inputErrors: error?.inputErrors,
    }));
  }
}

export function* getAttachedFileSaga({
  payload: {
    filename,
    onSuccess,
    onFailure,
  },
}) {
  yield put(getAttachedFileProcess());
  try {
    const file = yield call(api.getAttachedFile, filename);
    yield put(getAttachedFileSuccess(file));
    if (typeof onSuccess === 'function') {
      onSuccess(file);
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error);
    }
    yield put(getAttachedFileError(error?.message));
  }
}

export function* deleteAttachedFileSaga({ payload: { filename, onSuccess, onFailure } }) {
  yield put(deleteAttachedFileProcess());
  try {
    yield call(api.deleteAttachedFile, filename);
    yield put(deleteAttachedFileSuccess());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    if (typeof onFailure === 'function') {
      onFailure(error);
    }
    yield put(deleteAttachedFileError(error?.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchDocumentsList, fetchDocumentsListSaga);
  yield takeLatest(fetchDocument, fetchDocumentSaga);
  yield takeLatest(createDocument, createDocumentSaga);
  yield takeLatest(updateDocument, updateDocumentSaga);
  yield takeLatest(deleteDocument, deleteDocumentSaga);
  yield takeLatest(finalizeDocument, finalizeDocumentSaga);
  yield takeLatest(duplicateDocument, duplicateDocumentSaga);

  yield takeLatest(addAttachedFile, addAttachedFileSaga);
  yield takeLatest(updateAttachedFile, updateAttachedFileSaga);
  yield takeLatest(getAttachedFile, getAttachedFileSaga);
  yield takeLatest(deleteAttachedFile, deleteAttachedFileSaga);
}

export default rootSaga;
