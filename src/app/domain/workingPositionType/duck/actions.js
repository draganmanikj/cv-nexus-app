import constants from "./constants";

/*  -- Create Working Position Type -- */
const createWorkingPositionTypeRequest = (request) => {
    return {
        type: constants.CREATE_WORKING_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const createWorkingPositionTypeSuccess = (positionType) => {
    return {
        type: constants.CREATE_WORKING_POSITION_TYPE_SUCCESS,
        payload: positionType
    };
};
const createWorkingPositionTypeFail = (error) => {
    return {
        type: constants.CREATE_WORKING_POSITION_TYPE_FAIL,
        payload: error
    };
};

/*  -- Get Working Position Types -- */
const getWorkingPositionTypesRequest = (request) => {
    return {
        type: constants.GET_WORKING_POSITION_TYPES_REQUEST,
        payload: request
    };
};
const getWorkingPositionTypesSuccess = (positionTypes) => {
    return {
        type: constants.GET_WORKING_POSITION_TYPES_SUCCESS,
        payload: positionTypes
    };
};
const getWorkingPositionTypesFail = (error) => {
    return {
        type: constants.GET_WORKING_POSITION_TYPES_FAIL,
        payload: error
    };
};

/*  -- Delete Working Position Type -- */
const deleteWorkingPositionTypeRequest = (request) => {
    return {
        type: constants.DELETE_WORKING_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const deleteWorkingPositionTypeSuccess = (positionType) => {
    return {
        type: constants.DELETE_WORKING_POSITION_TYPE_SUCCESS,
        payload: positionType
    };
};
const deleteWorkingPositionTypeFail = (error) => {
    return {
        type: constants.DELETE_WORKING_POSITION_TYPE_FAIL,
        payload: error
    };
};

/*  -- Update Working Position Type -- */
const updateWorkingPositionTypeRequest = (request) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const updateWorkingPositionTypeSuccess = (positionType) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_TYPE_SUCCESS,
        payload: positionType
    };
};
const updateWorkingPositionTypeFail = (error) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_TYPE_FAIL,
        payload: error
    };
};

const activateWorkingPositionTypeSuccess = (workingPositionType) => {
    return {
        type: constants.ACTIVATE_WORKING_POSITION_TYPE_SUCCESS,
        payload: workingPositionType
    };
};

const deactivateWorkingPositionTypeSuccess = (workingPositionType) => {
    return {
        type: constants.DEACTIVATE_WORKING_POSITION_TYPE_SUCCESS,
        payload: workingPositionType
    };
};

const resetWorkingPositionTypes = () => {
    return {
        type: constants.RESET_WORKING_POSITION_TYPES,
        payload: {}
    };
};

export default {
    createWorkingPositionTypeRequest,
    createWorkingPositionTypeSuccess,
    createWorkingPositionTypeFail,
    getWorkingPositionTypesRequest,
    getWorkingPositionTypesSuccess,
    getWorkingPositionTypesFail,
    deleteWorkingPositionTypeRequest,
    deleteWorkingPositionTypeSuccess,
    deleteWorkingPositionTypeFail,
    updateWorkingPositionTypeRequest,
    updateWorkingPositionTypeSuccess,
    updateWorkingPositionTypeFail,
    activateWorkingPositionTypeSuccess,
    deactivateWorkingPositionTypeSuccess,
    resetWorkingPositionTypes
};