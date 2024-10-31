import constants from "./constants";

const createLanguagesRequest = (request) => {
    return {
        type: constants.CREATE_LANGUAGES_REQUEST,
        payload: request
    };
};
const createLanguagesSuccess = (languageDetails) => {    return {
        type: constants.CREATE_LANGUAGES_SUCCESS,
        payload: languageDetails
    };
};
const createLanguagesFail = (error) => {
    return {
        type: constants.CREATE_LANGUAGES_FAIL,
        payload: error
    };
};

const updateLanguagesRequest = (request) => {
    return {
        type: constants.UPDATE_LANGUAGES_REQUEST,
        payload: request
    };
};
const updateLanguagesSuccess = (languageDetails) => {
    return {
        type: constants.UPDATE_LANGUAGES_SUCCESS,
        payload: languageDetails
    };
};
const updateLanguagesFail = (error) => {
    return {
        type: constants.UPDATE_LANGUAGES_FAIL,
        payload: error
    };
};

const getLanguagesRequest = (request) => {
    return {
        type: constants.GET_LANGUAGES_REQUEST,
        payload: request
    };
};
const getLanguagesSuccess = (languageDetailss) => {
    return {
        type: constants.GET_LANGUAGES_SUCCESS,
        payload: languageDetailss
    };
};
const getLanguagesFail = (error) => {
    return {
        type: constants.GET_LANGUAGES_FAIL,
        payload: error
    };
};




const deleteLanguagesRequest = (request) => {
    return {
        type: constants.DELETE_LANGUAGES_REQUEST,
        payload: request
    };
};
const deleteLanguagesSuccess = (languageDetails) => {
    return {
        type: constants.DELETE_LANGUAGES_SUCCESS,
        payload: languageDetails
    };
};
const deleteLanguagesFail = (error) => {
    return {
        type: constants.DELETE_LANGUAGES_FAIL,
        payload: error
    };
};

const resetLanguages = () => {
    return {
        type: constants.RESET_LANGUAGES,
        payload: {}
    };
};

export default {
    createLanguagesRequest,
    createLanguagesSuccess,
    createLanguagesFail,
    updateLanguagesRequest,
    updateLanguagesSuccess,
    updateLanguagesFail,
    getLanguagesRequest,
    getLanguagesSuccess,
    getLanguagesFail,
    deleteLanguagesRequest,
    deleteLanguagesSuccess,
    deleteLanguagesFail,
    resetLanguages
};