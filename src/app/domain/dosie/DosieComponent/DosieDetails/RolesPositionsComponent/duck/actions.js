import constants from "./constants";

const createRolesPositionRequest = (request) => {
    return {
        type: constants.CREATE_ROLES_POSITION_REQUEST,
        payload: request
    };
};
const createRolesPositionSuccess = (position) => {    return {
        type: constants.CREATE_ROLES_POSITION_SUCCESS,
        payload: position
    };
};
const createRolesPositionFail = (error) => {
    return {
        type: constants.CREATE_ROLES_POSITION_FAIL,
        payload: error
    };
};



const getRolesPositionsRequest = (request) => {
    return {
        type: constants.GET_ROLES_POSITIONS_REQUEST,
        payload: request
    };
};
const getRolesPositionsSuccess = (positions) => {
    return {
        type: constants.GET_ROLES_POSITIONS_SUCCESS,
        payload: positions
    };
};
const getRolesPositionsFail = (error) => {
    return {
        type: constants.GET_ROLES_POSITIONS_FAIL,
        payload: error
    };
};




const deleteRolesPositionRequest = (request) => {
    return {
        type: constants.DELETE_ROLES_POSITION_REQUEST,
        payload: request
    };
};
const deleteRolesPositionSuccess = (position) => {
    return {
        type: constants.DELETE_ROLES_POSITION_SUCCESS,
        payload: position
    };
};
const deleteRolesPositionFail = (error) => {
    return {
        type: constants.DELETE_ROLES_POSITION_FAIL,
        payload: error
    };
};




const updateRolesPositionRequest = (request) => {
    return {
        type: constants.UPDATE_ROLES_POSITION_REQUEST,
        payload: request
    };
};
const updateRolesPositionSuccess = (position) => {
    return {
        type: constants.UPDATE_ROLES_POSITION_SUCCESS,
        payload: position
    };
};
const updateRolesPositionFail = (error) => {
    return {
        type: constants.UPDATE_ROLES_POSITION_FAIL,
        payload: error
    };
};




const activateRolesPositionSuccess = (position) => {
    return {
        type: constants.ACTIVATE_ROLES_POSITION_SUCCESS,
        payload: position
    };
};

const deactivateRolesPositionSuccess = (position) => {
    return {
        type: constants.DEACTIVATE_ROLES_POSITION_SUCCESS,
        payload: position
    };
};

const resetRolesPositions = () => {
    return {
        type: constants.RESET_ROLES_POSITIONS,
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
    createRolesPositionRequest,
    createRolesPositionSuccess,
    createRolesPositionFail,
    getRolesPositionsRequest,
    getRolesPositionsSuccess,
    getRolesPositionsFail,
    deleteRolesPositionRequest,
    deleteRolesPositionSuccess,
    deleteRolesPositionFail,
    updateRolesPositionRequest,
    updateRolesPositionSuccess,
    updateRolesPositionFail,
    activateRolesPositionSuccess,
    deactivateRolesPositionSuccess,
    resetRolesPositions,
    emptyList,
};