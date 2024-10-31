import constants from "./constants";

const createWorkingPositionRequest = (request) => {
    return {
        type: constants.CREATE_WORKING_POSITION_REQUEST,
        payload: request
    };
};
const createWorkingPositionSuccess = (position) => {    return {
        type: constants.CREATE_WORKING_POSITION_SUCCESS,
        payload: position
    };
};
const createWorkingPositionFail = (error) => {
    return {
        type: constants.CREATE_WORKING_POSITION_FAIL,
        payload: error
    };
};



const getWorkingPositionsRequest = (request) => {
    return {
        type: constants.GET_WORKING_POSITIONS_REQUEST,
        payload: request
    };
};
const getWorkingPositionsSuccess = (positions) => {
    return {
        type: constants.GET_WORKING_POSITIONS_SUCCESS,
        payload: positions
    };
};
const getWorkingPositionsFail = (error) => {
    return {
        type: constants.GET_WORKING_POSITIONS_FAIL,
        payload: error
    };
};




const deleteWorkingPositionRequest = (request) => {
    return {
        type: constants.DELETE_WORKING_POSITION_REQUEST,
        payload: request
    };
};
const deleteWorkingPositionSuccess = (position) => {
    return {
        type: constants.DELETE_WORKING_POSITION_SUCCESS,
        payload: position
    };
};
const deleteWorkingPositionFail = (error) => {
    return {
        type: constants.DELETE_WORKING_POSITION_FAIL,
        payload: error
    };
};




const updateWorkingPositionRequest = (request) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_REQUEST,
        payload: request
    };
};
const updateWorkingPositionSuccess = (position) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_SUCCESS,
        payload: position
    };
};
const updateWorkingPositionFail = (error) => {
    return {
        type: constants.UPDATE_WORKING_POSITION_FAIL,
        payload: error
    };
};




const activateWorkingPositionSuccess = (workingPosition) => {
    return {
        type: constants.ACTIVATE_WORKING_POSITION_SUCCESS,
        payload: workingPosition
    };
};

const deactivateWorkingPositionSuccess = (workingPosition) => {
    return {
        type: constants.DEACTIVATE_WORKING_POSITION_SUCCESS,
        payload: workingPosition
    };
};

const resetWorkingPositions = () => {
    return {
        type: constants.RESET_WORKING_POSITIONS,
        payload: {}
    };
};
const emptyList =()=>{
    return {
        type: constants.EMPTY_LIST,
        payload: [],
    }
}
export default {
    createWorkingPositionRequest,
    createWorkingPositionSuccess,
    createWorkingPositionFail,
    getWorkingPositionsRequest,
    getWorkingPositionsSuccess,
    getWorkingPositionsFail,
    deleteWorkingPositionRequest,
    deleteWorkingPositionSuccess,
    deleteWorkingPositionFail,
    updateWorkingPositionRequest,
    updateWorkingPositionSuccess,
    updateWorkingPositionFail,
    activateWorkingPositionSuccess,
    deactivateWorkingPositionSuccess,
    resetWorkingPositions,
    emptyList,
};