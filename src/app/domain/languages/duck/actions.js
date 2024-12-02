import constants from "./constants";

const createLanguagesTypeRequest = (request) => {
  return {
    type: constants.CREATE_LANGUAGES_TYPE_REQUEST,
    payload: request,
  };
};
const createLanguagesTypeSuccess = (languagesType) => {
  return {
    type: constants.CREATE_LANGUAGES_TYPE_SUCCESS,
    payload: languagesType,
  };
};
const createLanguagesTypeFail = (error) => {
  return {
    type: constants.CREATE_LANGUAGES_TYPE_FAIL,
    payload: error,
  };
};

const getLanguagesTypesRequest = (request) => {
  return {
    type: constants.GET_LANGUAGES_TYPES_REQUEST,
    payload: request,
  };
};
const getLanguagesTypesSuccess = (languagesTypes) => {
  return {
    type: constants.GET_LANGUAGES_TYPES_SUCCESS,
    payload: languagesTypes,
  };
};
const getLanguagesTypesFail = (error) => {
  return {
    type: constants.GET_LANGUAGES_TYPES_FAIL,
    payload: error,
  };
};

const deleteLanguagesTypeRequest = (request) => {
  return {
    type: constants.DELETE_LANGUAGES_TYPE_REQUEST,
    payload: request,
  };
};
const deleteLanguagesTypeSuccess = (languagesType) => {
  return {
    type: constants.DELETE_LANGUAGES_TYPE_SUCCESS,
    payload: languagesType,
  };
};
const deleteLanguagesTypeFail = (error) => {
  return {
    type: constants.DELETE_LANGUAGES_TYPE_FAIL,
    payload: error,
  };
};

const updateLanguagesTypeRequest = (request) => {
  return {
    type: constants.UPDATE_LANGUAGES_TYPE_REQUEST,
    payload: request,
  };
};
const updateLanguagesTypeSuccess = (languagesType) => {
  return {
    type: constants.UPDATE_LANGUAGES_TYPE_SUCCESS,
    payload: languagesType,
  };
};
const updateLanguagesTypeFail = (error) => {
  return {
    type: constants.UPDATE_LANGUAGES_TYPE_FAIL,
    payload: error,
  };
};

const activateLanguagesTypeSuccess = (languagesType) => {
  return {
    type: constants.ACTIVATE_LANGUAGES_TYPE_SUCCESS,
    payload: languagesType,
  };
};

const deactivateLanguagesTypeSuccess = (languagesType) => {
  return {
    type: constants.DEACTIVATE_LANGUAGES_TYPE_SUCCESS,
    payload: languagesType,
  };
};

const resetLanguagesTypes = () => {
  return {
    type: constants.RESET_LANGUAGES_TYPES,
    payload: {},
  };
};

export default {
  createLanguagesTypeRequest,
  createLanguagesTypeSuccess,
  createLanguagesTypeFail,
  getLanguagesTypesRequest,
  getLanguagesTypesSuccess,
  getLanguagesTypesFail,
  deleteLanguagesTypeRequest,
  deleteLanguagesTypeSuccess,
  deleteLanguagesTypeFail,
  updateLanguagesTypeRequest,
  updateLanguagesTypeSuccess,
  updateLanguagesTypeFail,
  activateLanguagesTypeSuccess,
  deactivateLanguagesTypeSuccess,
  resetLanguagesTypes,
};
