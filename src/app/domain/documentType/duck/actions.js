import constants from "./constants";

const createDocumentTypeRequest = (request) => {
  return {
    type: constants.CREATE_DOCUMENT_TYPE_REQUEST,
    payload: request,
  };
};
const createDocumentTypeSuccess = (documentType) => {
  return {
    type: constants.CREATE_DOCUMENT_TYPE_SUCCESS,
    payload: documentType,
  };
};
const createDocumentTypeFail = (error) => {
  return {
    type: constants.CREATE_DOCUMENT_TYPE_FAIL,
    payload: error,
  };
};

const getDocumentTypesRequest = (request) => {
  return {
    type: constants.GET_DOCUMENT_TYPES_REQUEST,
    payload: request,
  };
};
const getDocumentTypesSuccess = (documentTypes) => {
  return {
    type: constants.GET_DOCUMENT_TYPES_SUCCESS,
    payload: documentTypes,
  };
};
const getDocumentTypesFail = (error) => {
  return {
    type: constants.GET_DOCUMENT_TYPES_FAIL,
    payload: error,
  };
};

const deleteDocumentTypeRequest = (request) => {
  return {
    type: constants.DELETE_DOCUMENT_TYPE_REQUEST,
    payload: request,
  };
};
const deleteDocumentTypeSuccess = (documentType) => {
  return {
    type: constants.DELETE_DOCUMENT_TYPE_SUCCESS,
    payload: documentType,
  };
};
const deleteDocumentTypeFail = (error) => {
  return {
    type: constants.DELETE_DOCUMENT_TYPE_FAIL,
    payload: error,
  };
};

const updateDocumentTypeRequest = (request) => {
  return {
    type: constants.UPDATE_DOCUMENT_TYPE_REQUEST,
    payload: request,
  };
};
const updateDocumentTypeSuccess = (documentType) => {
  return {
    type: constants.UPDATE_DOCUMENT_TYPE_SUCCESS,
    payload: documentType,
  };
};
const updateDocumentTypeFail = (error) => {
  return {
    type: constants.UPDATE_DOCUMENT_TYPE_FAIL,
    payload: error,
  };
};

const activateDocumentTypeSuccess = (documentType) => {
  return {
    type: constants.ACTIVATE_DOCUMENT_TYPE_SUCCESS,
    payload: documentType,
  };
};

const deactivateDocumentTypeSuccess = (documentType) => {
  return {
    type: constants.DEACTIVATE_DOCUMENT_TYPE_SUCCESS,
    payload: documentType,
  };
};

const resetDocumentTypes = () => {
  return {
    type: constants.RESET_DOCUMENT_TYPES,
    payload: {},
  };
};

export default {
  createDocumentTypeRequest,
  createDocumentTypeSuccess,
  createDocumentTypeFail,
  getDocumentTypesRequest,
  getDocumentTypesSuccess,
  getDocumentTypesFail,
  deleteDocumentTypeRequest,
  deleteDocumentTypeSuccess,
  deleteDocumentTypeFail,
  updateDocumentTypeRequest,
  updateDocumentTypeSuccess,
  updateDocumentTypeFail,
  activateDocumentTypeSuccess,
  deactivateDocumentTypeSuccess,
  resetDocumentTypes,
};
