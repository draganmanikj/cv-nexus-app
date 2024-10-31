import constants from "./constants";

const createProjectsRequest = (request) => {
    return {
        type: constants.CREATE_PROJECTS_REQUEST,
        payload: request
    };
};
const createProjectsSuccess = (project) => {    return {
        type: constants.CREATE_PROJECTS_SUCCESS,
        payload: project
    };
};
const createProjectsFail = (error) => {
    return {
        type: constants.CREATE_PROJECTS_FAIL,
        payload: error
    };
};

const updateProjectsRequest = (request) => {
    return {
        type: constants.UPDATE_PROJECTS_REQUEST,
        payload: request
    };
};
const updateProjectsSuccess = (project) => {
    return {
        type: constants.UPDATE_PROJECTS_SUCCESS,
        payload: project
    };
};
const updateProjectsFail = (error) => {
    return {
        type: constants.UPDATE_PROJECTS_FAIL,
        payload: error
    };
};

const getProjectsRequest = (request) => {
    return {
        type: constants.GET_PROJECTS_REQUEST,
        payload: request
    };
};
const getProjectsSuccess = (projects) => {
    return {
        type: constants.GET_PROJECTS_SUCCESS,
        payload: projects
    };
};
const getProjectsFail = (error) => {
    return {
        type: constants.GET_PROJECTS_FAIL,
        payload: error
    };
};




const deleteProjectsRequest = (request) => {
    return {
        type: constants.DELETE_PROJECTS_REQUEST,
        payload: request
    };
};
const deleteProjectsSuccess = (project) => {
    return {
        type: constants.DELETE_PROJECTS_SUCCESS,
        payload: project
    };
};
const deleteProjectsFail = (error) => {
    return {
        type: constants.DELETE_PROJECTS_FAIL,
        payload: error
    };
};

const resetProjects = () => {
    return {
        type: constants.RESET_PROJECTS,
        payload: {}
    };
};

export default {
    createProjectsRequest,
    createProjectsSuccess,
    createProjectsFail,
    updateProjectsRequest,
    updateProjectsSuccess,
    updateProjectsFail,
    getProjectsRequest,
    getProjectsSuccess,
    getProjectsFail,
    deleteProjectsRequest,
    deleteProjectsSuccess,
    deleteProjectsFail,
    resetProjects
};