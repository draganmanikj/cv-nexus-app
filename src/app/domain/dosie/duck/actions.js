import constants from "./constants";

const getDosiesRequest = (request) => {
  return {
    type: constants.GET_ALL_DOSIE_REQUEST,
    payload: request,
  };
};

const getDosiesSuccess = (dosiea) => {
  return {
    type: constants.GET_ALL_DOSIE_SUCCESS,
    payload: dosiea,
  };
};

const getDosiesFail = (error) => {
  return {
    type: constants.GET_ALL_DOSIE_FAIL,
    payload: error,
  };
};

const getDosieByUserRequest = (request) => {
  // user?
  return {
    type: constants.GET_DOSIE_BY_USER_REQUEST,
    payload: request,
  };
};

const getDosieByUserSuccess = (dosie) => {
  return {
    type: constants.GET_DOSIE_BY_USER_SUCCESS,
    payload: dosie,
  };
};

const getDosieByUserFail = (error) => {
  return {
    type: constants.GET_DOSIE_BY_USER_FAIL,
    payload: error,
  };
};

const createDosieRequest = (request) => {
  return {
    type: constants.CREATE_DOSIE_REQUEST,
    payload: request,
  };
};

const createDosieSuccess = (dosie) => {
  return {
    type: constants.CREATE_DOSIE_SUCCESS,
    payload: dosie,
  };
};

const createDosieFail = (error) => {
  return {
    type: constants.CREATE_DOSIE_FAIL,
    payload: error,
  };
};

const updateDosieRequest = (request) => {
  return {
    type: constants.UPDATE_DOSIE_REQUEST,
    payload: request,
  };
};

const updateDosieSuccess = (dosie) => {
  return {
    type: constants.UPDATE_DOSIE_SUCCESS,
    payload: dosie,
  };
};

const updateDosieFail = (error) => {
  return {
    type: constants.UPDATE_DOSIE_FAIL,
    payload: error,
  };
};

const deleteDosieRequest = (id) => {
  return {
    type: constants.DELETE_DOSIE_REQUEST,
    payload: id,
  };
};

const deleteDosieSuccess = (responseMessage) => {
  return {
    type: constants.DELETE_DOSIE_SUCCESS,
    payload: responseMessage,
  };
};

const deleteDosieFail = (error) => {
  return {
    type: constants.DELETE_DOSIE_FAIL,
    payload: error,
  };
};

const resetDosie = () => {
  return {
    type: constants.RESET_DOSIE,
    payload: {},
  };
};
const getFilteredUsersRequest = (request) => {
  return {
    type: constants.GET_FILTERED_USERS_REQUEST,
    payload: request,
  };
};
const getFilteredUsersSuccess = (users) => {
  return {
    type: constants.GET_FILTERED_USERS_SUCCESS,
    payload: users,
  };
};
const getFilteredUsersFail = (error) => {
  return {
    type: constants.GET_FILTERED_USERS_FAIL,
    payload: error,
  };
};

const getRequestsRequest = (request) => {
  return {
    type: constants.GET_ALL_REQUESTS_REQUEST,
    payload: request,
  };
};

const getRequestsSuccess = (dosiea) => {
  return {
    type: constants.GET_ALL_REQUESTS_SUCCESS,
    payload: dosiea,
  };
};

const getRequestsFail = (error) => {
  return {
    type: constants.GET_ALL_REQUESTS_FAIL,
    payload: error,
  };
};
const getVacationDaysRequest = (request) => {
  return {
    type: constants.GET_VACATION_DAYS_REQUEST,
    payload: request,
  };
};

const getVacationDaysSuccess = (dosiea) => {
  return {
    type: constants.GET_VACATION_DAYS_SUCCESS,
    payload: dosiea,
  };
};

const getVacationDaysFail = (error) => {
  return {
    type: constants.GET_VACATION_DAYS_FAIL,
    payload: error,
  };
};

export default {
  getDosiesRequest,
  getDosiesSuccess,
  getDosiesFail,
  getDosieByUserRequest,
  getDosieByUserSuccess,
  getDosieByUserFail,
  createDosieRequest,
  createDosieSuccess,
  createDosieFail,
  updateDosieRequest,
  updateDosieSuccess,
  updateDosieFail,
  deleteDosieRequest,
  deleteDosieSuccess,
  deleteDosieFail,
  resetDosie,
  getFilteredUsersRequest,
  getFilteredUsersSuccess,
  getFilteredUsersFail,
  getRequestsRequest,
  getRequestsSuccess,
  getRequestsFail,
  getVacationDaysRequest,
  getVacationDaysSuccess,
  getVacationDaysFail,
};
