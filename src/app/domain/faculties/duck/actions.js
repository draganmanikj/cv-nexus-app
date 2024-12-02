import constants from "./constants"

const createFacultyTypeRequest = (request) => {
    return {
        type: constants.CREATE_FACULTY_TYPE_REQUEST,
        payload: request
    };
};
const createFacultyTypeSuccess = (faculty) => {
    return {
        type: constants.CREATE_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const createFacultyTypeFail = (error) => {
    return {
        type: constants.CREATE_FACULTY_TYPE_FAIL,
        payload: error
    };
};
const getFacultyTypeRequest = (request) => {
    return {
        type: constants.GET_FACULTY_TYPE_REQUEST,
        payload: request
    };
};
const getFacultyTypeSuccess = (faculty) => {
    return{
        type: constants.GET_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const getFacultyTypeFail = (error) => {
    return {
        type: constants.GET_FACULTY_TYPE_FAIL,
        payload: error
    };
};
const updateFacultyTypeRequest = (request) => {
    return{
        type: constants.UPDATE_FACULTY_TYPE_REQUEST,
        payload: request
    };
};
const updateFacultyTypeSuccess = (faculty) => {
    return{
        type: constants.UPDATE_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const updateFacultyTypeFail = (error) => {
    return{
        type: constants.UPDATE_FACULTY_TYPE_FAIL,
        payload: error
    };
};
const activateFacultyTypeSuccess = (faculty) => {
    return {
        type: constants.ACTIVATE_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const deactivateFacultyTypeSuccess = (faculty) => {
    return {
        type: constants.DEACTIVATE_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const deleteFacultyTypeRequest = (request) => {
    return{
        type: constants.DELETE_FACULTY_TYPE_REQUEST,
        payload: request
    };
};
const deleteFacultyTypeSuccess = (faculty) => {
    return{
        type: constants.DELETE_FACULTY_TYPE_SUCCESS,
        payload: faculty
    };
};
const deleteFacultyTypeFail = (error) => {
    return{
        type: constants.DELETE_FACULTY_TYPE_FAIL,
        payload: error
    };
};
const resetFaculty = () => {
    return {
        type: constants.RESET_FACULTY_TYPE,
        payload: {}
    };
};

export default{
    createFacultyTypeRequest,
    createFacultyTypeSuccess,
    createFacultyTypeFail,

    updateFacultyTypeRequest,
    updateFacultyTypeSuccess,
    updateFacultyTypeFail,

    getFacultyTypeRequest,
    getFacultyTypeSuccess,
    getFacultyTypeFail,

    deleteFacultyTypeRequest,
    deleteFacultyTypeSuccess,
    deleteFacultyTypeFail,

    activateFacultyTypeSuccess,
    deactivateFacultyTypeSuccess,

    resetFaculty,
}