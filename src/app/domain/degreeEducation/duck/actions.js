import constants from "./constants"

const createDegreeEducationTypeRequest = (request) => {
    return {
        type: constants.CREATE_DEGREE_EDUCATION_TYPE_REQUEST,
        payload: request
    };
};
const createDegreeEducationTypeSuccess = (degreeEducation) => {
    return {
        type: constants.CREATE_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const createDegreeEducationTypeFail = (error) => {
    return {
        type: constants.CREATE_DEGREE_EDUCATION_TYPE_FAIL,
        payload: error
    };
};
const getDegreeEducationTypeRequest = (request) => {
    return {
        type: constants.GET_DEGREE_EDUCATION_TYPE_REQUEST,
        payload: request
    };
};
const getDegreeEducationTypeSuccess = (degreeEducation) => {
    return{
        type: constants.GET_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const getDegreeEducationTypeFail = (error) => {
    return {
        type: constants.GET_DEGREE_EDUCATION_TYPE_FAIL,
        payload: error
    };
};
const updateDegreeEducationTypeRequest = (request) => {
    return{
        type: constants.UPDATE_DEGREE_EDUCATION_TYPE_REQUEST,
        payload: request
    };
};
const updateDegreeEducationTypeSuccess = (degreeEducation) => {
    return{
        type: constants.UPDATE_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const updateDegreeEducationTypeFail = (error) => {
    return{
        type: constants.UPDATE_DEGREE_EDUCATION_TYPE_FAIL,
        payload: error
    };
};
const activateDegreeEducationTypeSuccess = (degreeEducation) => {
    return {
        type: constants.ACTIVATE_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const deactivateDegreeEducationTypeSuccess = (degreeEducation) => {
    return {
        type: constants.DEACTIVATE_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const deleteDegreeEducationTypeRequest = (request) => {
    return{
        type: constants.DELETE_DEGREE_EDUCATION_TYPE_REQUEST,
        payload: request
    };
};
const deleteDegreeEducationTypeSuccess = (degreeEducation) => {
    return{
        type: constants.DELETE_DEGREE_EDUCATION_TYPE_SUCCESS,
        payload: degreeEducation
    };
};
const deleteDegreeEducationTypeFail = (error) => {
    return{
        type: constants.DELETE_DEGREE_EDUCATION_TYPE_FAIL,
        payload: error
    };
};
const resetDegreeEducation = () => {
    return {
        type: constants.RESET_DEGREE_EDUCATION_TYPE,
        payload: {}
    };
};

export default{
    createDegreeEducationTypeRequest,
    createDegreeEducationTypeSuccess,
    createDegreeEducationTypeFail,

    updateDegreeEducationTypeRequest,
    updateDegreeEducationTypeSuccess,
    updateDegreeEducationTypeFail,

    getDegreeEducationTypeRequest,
    getDegreeEducationTypeSuccess,
    getDegreeEducationTypeFail,

    deleteDegreeEducationTypeRequest,
    deleteDegreeEducationTypeSuccess,
    deleteDegreeEducationTypeFail,

    activateDegreeEducationTypeSuccess,
    deactivateDegreeEducationTypeSuccess,

    resetDegreeEducation,
}