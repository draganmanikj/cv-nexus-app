import constants from "./constants";

const createDocumentRequest = (request) => {
  return {
    type: constants.CREATE_DOCUMENT_REQUEST,
    payload: request,
  };
};

const createDocumentSuccess = (document) => {
  return {
    type: constants.CREATE_DOCUMENT_SUCCESS,
    payload: document,
  };
};

const createDocumentFail = (error) => {
  return {
    type: constants.CREATE_DOCUMENT_FAIL,
    payload: error,
  };
};

const getDocumentsRequest = (request) => {
  return {
    type: constants.GET_DOCUMENTS_REQUEST,
    payload: request,
  };
};

const getDocumentsSuccess = (documents) => {
  return {
    type: constants.GET_DOCUMENTS_SUCCESS,
    payload: documents,
  };
};

const getDocumentsFail = (error) => {
  return {
    type: constants.GET_DOCUMENTS_FAIL,
    payload: error,
  };
};

const getDocumentsByDosieRequest = (request) => {
  return {
    type: constants.GET_DOCUMENTS_BY_DOSIE_REQUEST,
    payload: request,
  };
};

const getDocumentsByDosieSuccess = (documents) => {
  return {
    type: constants.GET_DOCUMENTS_BY_DOSIE_SUCCESS,
    payload: documents,
  };
};

const getDocumentsByDosieFail = (error) => {
  return {
    type: constants.GET_DOCUMENTS_BY_DOSIE_FAIL,
    payload: error,
  };
};

const deleteDocumentRequest = (request) => {
  return {
    type: constants.DELETE_DOCUMENTS_REQUEST,
    payload: request,
  };
};

const deleteDocumentSuccess = (documentId) => {
  return {
    type: constants.DELETE_DOCUMENTS_SUCCESS,
    payload: documentId,
  };
};

const deleteDocumentFail = (error) => {
  return {
    type: constants.DELETE_DOCUMENTS_FAIL,
    payload: error,
  };
};

const updateDocumentRequest = (request) => {
  return {
    type: constants.UPDATE_DOCUMENT_REQUEST,
    payload: request,
  };
};
const updateDocumentSuccess = (document) => {
  return {
    type: constants.UPDATE_DOCUMENT_SUCCESS,
    payload: document,
  };
};
const updateDocumentFail = (error) => {
  return {
    type: constants.UPDATE_DOCUMENT_FAIL,
    payload: error,
  };
};

const uploadDocumentRequest = (request) => {
  return {
    type: constants.UPLOAD_DOCUMENT_REQUEST,
    payload: request,
  };
};

const uploadDocumentSuccess = (documentUrl) => {
  return {
    type: constants.UPLOAD_DOCUMENT_SUCCESS,
    payload: documentUrl,
  };
};

const uploadDocumentFail = (error) => {
  return {
    type: constants.UPLOAD_DOCUMENT_FAIL,
    payload: error,
  };
};

const downloadDocumentRequest = (request) => {
  return {
    type: constants.DOWNLOAD_DOCUMENT_REQUEST,
    payload: request
  }
}

const downloadDocumentSuccess = (response) => {
  return {
    type: constants.DOWNLOAD_DOCUMENT_SUCCESS,
    payload: response
  }
}

const downloadDocumentFail = (error) => {
  return {
    type: constants.DOWNLOAD_DOCUMENT_FAIL,
    payload: error
  }
}

const updateDocumentUrl = (documentId, documentUrl, newFile) => {
  return {
    type: constants.DOCUMENT_UPDATE_STATE_URL,
    payload: {
      documentId: documentId,
      documentUrl: documentUrl,
      newFile: newFile,
    }
  }
}
const changeDocUrlSuccess = (item) => {
  return {
    type: constants.CHANGE_DOC_URL_SUCCESS,
    payload: item
  }
}
const changeDocUrlFail = (item) => {
  return {
    type: constants.CHANGE_DOC_URL_FAIL,
    payload: item
  }
}
export default {
  createDocumentRequest,
  createDocumentSuccess,
  createDocumentFail,
  getDocumentsRequest,
  getDocumentsSuccess,
  getDocumentsFail,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  deleteDocumentFail,
  updateDocumentRequest,
  updateDocumentSuccess,
  updateDocumentFail,
  uploadDocumentRequest,
  uploadDocumentSuccess,
  uploadDocumentFail,
  getDocumentsByDosieRequest,
  getDocumentsByDosieSuccess,
  getDocumentsByDosieFail,
  downloadDocumentRequest,
  downloadDocumentSuccess,
  downloadDocumentFail,
  updateDocumentUrl,
  changeDocUrlSuccess,
  changeDocUrlFail,
};
