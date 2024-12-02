import constants from "./constants"

const createCountryTypeRequest = (request) => {
    return {
        type: constants.CREATE_COUNTRY_TYPE_REQUEST,
        payload: request
    };
};
const createCountryTypeSuccess = (country) => {
    return {
        type: constants.CREATE_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const createCountryTypeFail = (error) => {
    return {
        type: constants.CREATE_COUNTRY_TYPE_FAIL,
        payload: error
    };
};
const getCountryTypeRequest = (request) => {
    return {
        type: constants.GET_COUNTRY_TYPE_REQUEST,
        payload: request
    };
};
const getCountryTypeSuccess = (country) => {
    return{
        type: constants.GET_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const getCountryTypeFail = (error) => {
    return {
        type: constants.GET_COUNTRY_TYPE_FAIL,
        payload: error
    };
};
const updateCountryTypeRequest = (request) => {
    return{
        type: constants.UPDATE_COUNTRY_TYPE_REQUEST,
        payload: request
    };
};
const updateCountryTypeSuccess = (country) => {
    return{
        type: constants.UPDATE_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const updateCountryTypeFail = (error) => {
    return{
        type: constants.UPDATE_COUNTRY_TYPE_FAIL,
        payload: error
    };
};
const activateCountryTypeSuccess = (country) => {
    return {
        type: constants.ACTIVATE_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const deactivateCountryTypeSuccess = (country) => {
    return {
        type: constants.DEACTIVATE_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const deleteCountryTypeRequest = (request) => {
    return{
        type: constants.DELETE_COUNTRY_TYPE_REQUEST,
        payload: request
    };
};
const deleteCountryTypeSuccess = (country) => {
    return{
        type: constants.DELETE_COUNTRY_TYPE_SUCCESS,
        payload: country
    };
};
const deleteCountryTypeFail = (error) => {
    return{
        type: constants.DELETE_COUNTRY_TYPE_FAIL,
        payload: error
    };
};
const resetCountry = () => {
    return {
        type: constants.RESET_COUNTRY_TYPE,
        payload: {}
    };
};

export default{
    createCountryTypeRequest,
    createCountryTypeSuccess,
    createCountryTypeFail,

    updateCountryTypeRequest,
    updateCountryTypeSuccess,
    updateCountryTypeFail,

    getCountryTypeRequest,
    getCountryTypeSuccess,
    getCountryTypeFail,

    deleteCountryTypeRequest,
    deleteCountryTypeSuccess,
    deleteCountryTypeFail,

    activateCountryTypeSuccess,
    deactivateCountryTypeSuccess,

    resetCountry,
}