import constants from "./constants"

const createTypeAreaTypeRequest = (request) => {
    return {
        type: constants.CREATE_TYPE_AREA_TYPE_REQUEST,
        payload: request
    };
};
const createTypeAreaTypeSuccess = (typeArea) => {
    return {
        type: constants.CREATE_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const createTypeAreaTypeFail = (error) => {
    return {
        type: constants.CREATE_TYPE_AREA_TYPE_FAIL,
        payload: error
    };
};
const getTypeAreaTypeRequest = (request) => {
    return {
        type: constants.GET_TYPE_AREA_TYPE_REQUEST,
        payload: request
    };
};
const getTypeAreaTypeSuccess = (typeArea) => {
    return{
        type: constants.GET_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const getTypeAreaTypeFail = (error) => {
    return {
        type: constants.GET_TYPE_AREA_TYPE_FAIL,
        payload: error
    };
};
const updateTypeAreaTypeRequest = (request) => {
    return{
        type: constants.UPDATE_TYPE_AREA_TYPE_REQUEST,
        payload: request
    };
};
const updateTypeAreaTypeSuccess = (typeArea) => {
    return{
        type: constants.UPDATE_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const updateTypeAreaTypeFail = (error) => {
    return{
        type: constants.UPDATE_TYPE_AREA_TYPE_FAIL,
        payload: error
    };
};
const activateTypeAreaTypeSuccess = (typeArea) => {
    return {
        type: constants.ACTIVATE_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const deactivateTypeAreaTypeSuccess = (typeArea) => {
    return {
        type: constants.DEACTIVATE_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const deleteTypeAreaTypeRequest = (request) => {
    return{
        type: constants.DELETE_TYPE_AREA_TYPE_REQUEST,
        payload: request
    };
};
const deleteTypeAreaTypeSuccess = (typeArea) => {
    return{
        type: constants.DELETE_TYPE_AREA_TYPE_SUCCESS,
        payload: typeArea
    };
};
const deleteTypeAreaTypeFail = (error) => {
    return{
        type: constants.DELETE_TYPE_AREA_TYPE_FAIL,
        payload: error
    };
};
const resetTypeArea = () => {
    return {
        type: constants.RESET_TYPE_AREA_TYPE,
        payload: {}
    };
};

export default{
    createTypeAreaTypeRequest,
    createTypeAreaTypeSuccess,
    createTypeAreaTypeFail,

    updateTypeAreaTypeRequest,
    updateTypeAreaTypeSuccess,
    updateTypeAreaTypeFail,

    getTypeAreaTypeRequest,
    getTypeAreaTypeSuccess,
    getTypeAreaTypeFail,

    deleteTypeAreaTypeRequest,
    deleteTypeAreaTypeSuccess,
    deleteTypeAreaTypeFail,

    activateTypeAreaTypeSuccess,
    deactivateTypeAreaTypeSuccess,

    resetTypeArea,
}