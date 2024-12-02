import constants from "./constants"

const createUniversityTypeRequest = (request) => {
    return {
        type: constants.CREATE_UNIVERSITY_TYPE_REQUEST,
        payload: request
    };
};
const createUniversityTypeSuccess = (university) => {
    return {
        type: constants.CREATE_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const createUniversityTypeFail = (error) => {
    return {
        type: constants.CREATE_UNIVERSITY_TYPE_FAIL,
        payload: error
    };
};
const getUniversityTypeRequest = (request) => {
    return {
        type: constants.GET_UNIVERSITY_TYPE_REQUEST,
        payload: request
    };
};
const getUniversityTypeSuccess = (university) => {
    return{
        type: constants.GET_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const getUniversityTypeFail = (error) => {
    return {
        type: constants.GET_UNIVERSITY_TYPE_FAIL,
        payload: error
    };
};
const updateUniversityTypeRequest = (request) => {
    return{
        type: constants.UPDATE_UNIVERSITY_TYPE_REQUEST,
        payload: request
    };
};
const updateUniversityTypeSuccess = (university) => {
    return{
        type: constants.UPDATE_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const updateUniversityTypeFail = (error) => {
    return{
        type: constants.UPDATE_UNIVERSITY_TYPE_FAIL,
        payload: error
    };
};
const activateUniversityTypeSuccess = (university) => {
    return {
        type: constants.ACTIVATE_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const deactivateUniversityTypeSuccess = (university) => {
    return {
        type: constants.DEACTIVATE_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const deleteUniversityTypeRequest = (request) => {
    return{
        type: constants.DELETE_UNIVERSITY_TYPE_REQUEST,
        payload: request
    };
};
const deleteUniversityTypeSuccess = (university) => {
    return{
        type: constants.DELETE_UNIVERSITY_TYPE_SUCCESS,
        payload: university
    };
};
const deleteUniversityTypeFail = (error) => {
    return{
        type: constants.DELETE_UNIVERSITY_TYPE_FAIL,
        payload: error
    };
};
const resetUniversity = () => {
    return {
        type: constants.RESET_UNIVERSITY_TYPE,
        payload: {}
    };
};

export default{
    createUniversityTypeRequest,
    createUniversityTypeSuccess,
    createUniversityTypeFail,

    updateUniversityTypeRequest,
    updateUniversityTypeSuccess,
    updateUniversityTypeFail,

    getUniversityTypeRequest,
    getUniversityTypeSuccess,
    getUniversityTypeFail,

    deleteUniversityTypeRequest,
    deleteUniversityTypeSuccess,
    deleteUniversityTypeFail,

    activateUniversityTypeSuccess,
    deactivateUniversityTypeSuccess,

    resetUniversity,
}