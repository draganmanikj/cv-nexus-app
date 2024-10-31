import actions from "./actions";
import {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocuments,
  uploadDocument,
  getDocumentsByDosie,
  downloadDocument,
} from "../../../api/documentApi";

const createItem = (documentDetails) => {
  return (dispatch, getState) => {
    dispatch(actions.createDocumentRequest());
    return createDocument(documentDetails)
      .then((returnedItem) => {
        dispatch(actions.createDocumentSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createDocumentFail(e));
        return Promise.reject(e);
      });
  };
};

const fetchDocuments = (formData) => {
  return (dispatch) => {
    dispatch(actions.getDocumentsRequest());
    return getDocuments(formData)
      .then((returnedItem) => {
        dispatch(actions.getDocumentsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getDocumentsFail(e));
        Promise.reject(e);
      });
  };
};

export const updateSelectedDocument = (item) => {
  return (dispatch) => {
    dispatch(actions.updateDocumentRequest());
    return updateDocument(item)
    .then((returnedItem) => {
        dispatch(actions.updateDocumentSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateDocumentFail(e));
        return Promise.reject(e);
      });
  };
};



export const deleteSelectedDocument = (education) => {
  return (dispatch) => {
    dispatch(actions.deleteDocumentRequest());
    return deleteDocuments(education)
      .then((returnedItem) => {
        dispatch(actions.deleteDocumentSuccess(education));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteDocumentFail(e));
        return Promise.reject(e);
      });
  };
};

const onUploadDocument = (documentUrl) => {
  return (dispatch, getState) => {
    dispatch(actions.uploadDocumentRequest());
    return uploadDocument(documentUrl)
      .then((returnedItem) => {
        dispatch(actions.uploadDocumentSuccess(documentUrl));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.uploadDocumentFail(e));
        Promise.reject(e);
      });
  };
};

const getAllDocumentsByDosie = (dosieId) => {
  return (dispatch, getState) => {
    dispatch(actions.getDocumentsByDosieRequest(dosieId));
    return getDocumentsByDosie(dosieId)
      .then((returnedItem) => {
        dispatch(actions.getDocumentsByDosieSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getDocumentsByDosieFail(e));
        Promise.reject(e);
      });
  };
};

const downloadDocumentForTemplate = (documentId, fileName) => {
  return (dispatch, getState) => {
      return downloadDocument(documentId)
          .then((response) => {
              const downloadUrl = window.URL.createObjectURL(new Blob([response]));
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.setAttribute('download', fileName ? fileName : "test.docx");
              document.body.appendChild(link);
              link.click();
              link.remove();
              return Promise.resolve(response);
          })
          .catch((e) => {
              return Promise.reject(e);
          });
  };
};

const updateDocumentUrl = (documentId, documentUrl, newFile) => {
    return (dispatch) => {
        dispatch(actions.updateDocumentUrl(documentId, documentUrl, newFile));
    }
}

export default {
  createItem,
  fetchDocuments,
  updateSelectedDocument,
  deleteSelectedDocument,
  onUploadDocument,
  getAllDocumentsByDosie,
  downloadDocumentForTemplate,
  updateDocumentUrl,
};
