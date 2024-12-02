import constants from "./constants"

const createRolePositionTypeRequest = (request) => {
    return {
        type: constants.CREATE_ROLE_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const createRolePositionTypeSuccess = (positionType) => {
    return {
        type: constants.CREATE_ROLE_POSITION_TYPE_SUCCESS,
        payload: positionType
    };
};
const createRolePositionTypeFail = (error) => {
    return {
        type: constants.CREATE_ROLE_POSITION_TYPE_FAIL,
        payload: error
    };
};

const getRolePositionTypeRequest = (request) => {
    return {
        type: constants.GET_ROLE_POSITION_TYPES_REQUEST,
        payload: request
    };
};
const getRolePositionTypeSuccess = (roleType) => {
    return{
        type: constants.GET_ROLE_POSITION_TYPES_SUCCESS,
        payload: roleType
    };
};
const getRolePositionTypeFail = (error) => {
    return {
        type: constants.GET_ROLE_POSITION_TYPES_FAIL,
        payload: error
    };
};
const updateRolePositionTypeRequest = (request) => {
    return{
        type: constants.UPDATE_ROLE_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const updateRolePositionTypeSuccess = (roleType) => {
    return{
        type: constants.UPDATE_ROLE_POSITION_TYPE_SUCCESS,
        payload: roleType
    };
};
const updateRolePositionTypeFail = (error) => {
    return{
        type: constants.UPDATE_ROLE_POSITION_TYPE_FAIL,
        payload: error
    };
};
const activateRolePositionTypeSuccess = (rolePositionType) => {
    return {
        type: constants.ACTIVATE_ROLE_POSITION_TYPE_SUCCESS,
        payload: rolePositionType
    };
};
const deactivateRolePositionTypeSuccess = (rolePositionType) => {
    return {
        type: constants.DEACTIVATE_ROLE_POSITION_TYPE_SUCCESS,
        payload: rolePositionType
    };
};
const deleteRolePositionTypeRequest = (request) => {
    return{
        type: constants.DELETE_ROLE_POSITION_TYPE_REQUEST,
        payload: request
    };
};
const deleteRolePositionTypeSuccess = (rolePositionType) => {
    return{
        type: constants.DELETE_ROLE_POSITION_TYPE_SUCCESS,
        payload: rolePositionType
    };
};
const deleteRolePositionTypeFail = (error) => {
    return{
        type: constants.DELETE_ROLE_POSITION_TYPE_FAIL,
        payload: error
    };
};
const resetRolePositionTypes = () => {
    return {
        type: constants.RESET_ROLE_POSITION_TYPES,
        payload: {}
    };
};


export default{
    createRolePositionTypeFail,
    createRolePositionTypeRequest,
    createRolePositionTypeSuccess,
    
    getRolePositionTypeFail,
    getRolePositionTypeRequest,
    getRolePositionTypeSuccess,

    updateRolePositionTypeFail,
    updateRolePositionTypeRequest,
    updateRolePositionTypeSuccess,

    deleteRolePositionTypeFail,
    deleteRolePositionTypeRequest,
    deleteRolePositionTypeSuccess,

    activateRolePositionTypeSuccess,
    deactivateRolePositionTypeSuccess,

    resetRolePositionTypes,
}