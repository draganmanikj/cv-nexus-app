import constants from "./constants";

const getUserInfoRequest = (request) => {
    return {
        type: constants.USER_INFO_FETCH_REQUEST,
        payload: request,
    };
};

const getUserInfoSuccess = (user) => {
    return {
        type: constants.USER_INFO_FETCH_SUCCESS,
        payload: user,
    };
};

const getUserInfoFail = (error) => {
    return {
        type: constants.USER_INFO_FETCH_FAIL,
        payload: error,
    };
};
const languageValueChange = (lng) => {
    return {
        type: constants.LANGUAGE_VALUE_CHANGE,
        payload: lng,
    };
};

const setAction = action => {
    return {
      type: constants.SET_ACTION,
      payload: action
    };
  };

const headerTitleChange = (headerTitle) => {
    return {
        type: constants.HEADER_TITLE_CHANGE,
        payload: headerTitle
    };
};

const resetHeaderReducer = () => {
    return {
        type: constants.HEADER_TITLE_RESET,
        payload: {},
    };
};

export default {
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
    languageValueChange,
    setAction,
    headerTitleChange,
    resetHeaderReducer
}