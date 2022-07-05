import axios from '~/lib/axios';

// Document
export const fetchDocumentsList = async (params) => {
  const filters = Object.entries(params || {}).map(
    ([key, val]) => `${key}=${encodeURIComponent(val)}`,
  ).join('&');
  return axios(`/documents?${filters}`, { method: 'get' });
};

export const fetchDocument = async (id) => (
  axios(`/documents/document/${id}`, { method: 'get' })
);

export const createDocument = async (data) => (
  axios('/documents/create', { method: 'post', data })
);

export const updateDocument = async (id, data) => (
  axios(`/documents/document/${id}`, { method: 'put', data })
);

export const deleteDocument = async (id) => (
  axios(`/documents/document/${id}`, { method: 'delete' })
);

export const finalizeDocument = async (id) => (
  axios(`/documents/document/${id}/make_as_finilased`, { method: 'put' })
);

export const duplicateDocument = async (id) => (
  axios(`/documents/document/${id}/clone`, { method: 'post' })
);

// Attached files

export const addAttachedFile = async (data) => (
  axios('/attached_files', { method: 'post', data })
);

export const updateAttachedFile = async (id, data) => (
  axios(`/attached_files?filename=${id}`, { method: 'put', data })
);

export const getAttachedFile = async (filename) => (
  axios(`/attached_files?filename=${filename}`, { method: 'get', responseType: 'blob' })
    .then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response.data]),
        { type: response.headers['content-type'], encoding: 'UTF-8' },
      );
      if (filename.match(/.(jpg|jpeg|png|gif)$/i)) {
        return url;
      }

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      return undefined;
    })
);

export const deleteAttachedFile = async (id) => (
  axios(`/attached_files?filename=${id}`, { method: 'delete' })
);
