import constants from "./constants";

const fetchTemplatesByTypeRequest = (request) => {
    return {
        type: constants.TEMPLATES_FETCH_BY_TYPE_REQUEST,
        payload: request,
    };
};

const fetchTemplatesByTypeSuccess = (result) => {
    return {
        type: constants.TEMPLATES_FETCH_BY_TYPE_SUCCESS,
        payload: result,
    };
};

const fetchTemplatesByTypeFail = (error) => {
    return {
        type: constants.TEMPLATES_FETCH_BY_TYPE_FAIL,
        payload: error,
    };
};

const generateTemplateRequest = (request) => {
    return {
        type: constants.TEMPLATES_GENERATE_REQUEST,
        payload: request,
    };
};

const generateTemplateSuccess = (result) => {
    return {
        type: constants.TEMPLATES_GENERATE_SUCCESS,
        payload: result,
    };
};

const generateTemplateFail = (error) => {
    return {
        type: constants.TEMPLATES_GENERATE_FAIL,
        payload: error,
    };
};

export default {
    generateTemplateRequest,
    generateTemplateSuccess,
    generateTemplateFail
}