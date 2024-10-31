import constants from "./constants";

const createPrivateHealthcareRequest = (request) => {
    return {
        type: constants.CREATE_PRIVATE_HEALTHCARE_REQUEST,
        payload: request
    };
};
const createPrivateHealthcareSuccess = (privatehealthcare) => {    return {
        type: constants.CREATE_PRIVATE_HEALTHCARE_SUCCESS,
        payload: privatehealthcare
    };
};
const createPrivateHealthcareFail = (error) => {
    return {
        type: constants.CREATE_PRIVATE_HEALTHCARE_FAIL,
        payload: error
    };
};



const getPrivateHealthcaresRequest = (request) => {
    return {
        type: constants.GET_PRIVATE_HEALTHCARES_REQUEST,
        payload: request
    };
};
const getPrivateHealthcaresSuccess = (privatehealthcares) => {
    return {
        type: constants.GET_PRIVATE_HEALTHCARES_SUCCESS,
        payload: privatehealthcares
    };
};
const getPrivateHealthcaresFail = (error) => {
    return {
        type: constants.GET_PRIVATE_HEALTHCARES_FAIL,
        payload: error
    };
};

export const continueHealthCareRequest = request => {
    return {
        type: constants.CONTINUE_HEALTH_CARE_REQUEST,
        payload: request
    };
};

export const continueHealthCareSuccess = healthcare => {
    return {
        type: constants.CONTINUE_HEALTH_CARE_SUCCESS,
        payload: healthcare
    };
};

export const continueHealthCareFail = error => {
    return {
        type: constants.CONTINUE_HEALTH_CARE_FAIL,
        payload: error
    };
};





const deletePrivateHealthcareRequest = (request) => {
    return {
        type: constants.DELETE_PRIVATE_HEALTHCARE_REQUEST,
        payload: request
    };
};
const deletePrivateHealthcareSuccess = (privatehealthcare) => {
    return {
        type: constants.DELETE_PRIVATE_HEALTHCARE_SUCCESS,
        payload: privatehealthcare
    };
};
const deletePrivateHealthcareFail = (error) => {
    return {
        type: constants.DELETE_PRIVATE_HEALTHCARE_FAIL,
        payload: error
    };
};




const updatePrivateHealthcareRequest = (request) => {
    return {
        type: constants.UPDATE_PRIVATE_HEALTHCARE_REQUEST,
        payload: request
    };
};
const updatePrivateHealthcareSuccess = (privatehealthcare) => {
    return {
        type: constants.UPDATE_PRIVATE_HEALTHCARE_SUCCESS,
        payload: privatehealthcare
    };
};
const updatePrivateHealthcareFail = (error) => {
    return {
        type: constants.UPDATE_PRIVATE_HEALTHCARE_FAIL,
        payload: error
    };
};




const activatePrivateHealthcareSuccess = (privatehealthcare) => {
    return {
        type: constants.ACTIVATE_PRIVATE_HEALTHCARE_SUCCESS,
        payload: privatehealthcare
    };
};

const deactivatePrivateHealthcareSuccess = (privatehealthcare) => {
    return {
        type: constants.DEACTIVATE_PRIVATE_HEALTHCARE_SUCCESS,
        payload: privatehealthcare
    };
};

const resetPrivateHealthcares = () => {
    return {
        type: constants.RESET_PRIVATE_HEALTHCARES,
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
    createPrivateHealthcareRequest,
    createPrivateHealthcareSuccess,
    createPrivateHealthcareFail,
    getPrivateHealthcaresRequest,
    getPrivateHealthcaresSuccess,
    getPrivateHealthcaresFail,
    deletePrivateHealthcareRequest,
    deletePrivateHealthcareSuccess,
    deletePrivateHealthcareFail,
    updatePrivateHealthcareRequest,
    updatePrivateHealthcareSuccess,
    updatePrivateHealthcareFail,
    activatePrivateHealthcareSuccess,
    deactivatePrivateHealthcareSuccess,
    continueHealthCareRequest,
    continueHealthCareSuccess,
    continueHealthCareFail,
    resetPrivateHealthcares,
    emptyList,
};