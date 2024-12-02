import constants from "./constants";

const createOutputDocumentPrintRequest = (request) => {
  return {
    type: constants.CREATE_OUTPUT_DOCUMENT_PRINT_REQUEST,
    payload: request,
  };
};

const createOutputDocumentPrintSuccess = (nagrada) => {
  return {
    type: constants.CREATE_OUTPUT_DOCUMENT_PRINT_SUCCESS,
    payload: nagrada,
  };
};

const createOutputDocumentPrintFail = (error) => {
  return {
    type: constants.CREATE_OUTPUT_DOCUMENT_PRINT_FAIL,
    payload: error,
  };
};

const getOutputDocumentsPrintRequest = (request) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENTS_PRINT_REQUEST,
    payload: request,
  };
};

const getOutputDocumentsPrintSuccess = (doc) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENTS_PRINT_SUCCESS,
    payload: doc,
  };
};

const getOutputDocumentsPrintFail = (error) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENTS_PRINT_FAIL,
    payload: error,
  };
};

const deleteOutputDocumentPrintRequest = (request) => {
  return {
    type: constants.DELETE_OUTPUT_DOCUMENT_PRINT_REQUEST,
    payload: request,
  };
};

const deleteOutputDocumentPrintSuccess = (templateId) => {
  return {
    type: constants.DELETE_OUTPUT_DOCUMENT_PRINT_SUCCESS,
    payload: templateId,
  };
};

const deleteOutputDocumentPrintFail = (error) => {
  return {
    type: constants.DELETE_OUTPUT_DOCUMENT_PRINT_FAIL,
    payload: error,
  };
};

const updateOutputDocumentPrintRequest = (request) => {
  return {
    type: constants.UPDATE_OUTPUT_DOCUMENT_PRINT_REQUEST,
    payload: request,
  };
};
const updateOutputDocumentPrintSuccess = (doc) => {
  return {
    type: constants.UPDATE_OUTPUT_DOCUMENT_PRINT_SUCCESS,
    payload: doc,
  };
};
const updateOutputDocumentPrintFail = (error) => {
  return {
    type: constants.UPDATE_OUTPUT_DOCUMENT_PRINT_FAIL,
    payload: error,
  };
};

const getParametersForSqlOutputDocumentPrintRequest = (request) => {
  return {
    type: constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_REQUEST,
    payload: request,
  };
};
const getParametersForSqlOutputDocumentPrintSuccess = (nagrada) => {
  return {
    type: constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_SUCCESS,
    payload: nagrada,
  };
};
const getParametersForSqlOutputDocumentPrintFail = (error) => {
  return {
    type: constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_FAIL,
    payload: error,
  };
};

const getOutputDocumentTypeRequest = (request) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENT_PRINT_TYPE_REQUEST,
    payload: request,
  };
};
const getOutputDocumentTypeSuccess = (returnData) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENT_PRINT_TYPE_SUCCESS,
    payload: returnData,
  };
};
const getOutputDocumentTypeFail = (error) => {
  return {
    type: constants.GET_OUTPUT_DOCUMENT_PRINT_TYPE_FAIL,
    payload: error,
  };
};

const resetOutputDocumentsPrint = () => {
  return {
    type: constants.RESET_OUTPUT_DOCUMENTS_PRINT,
    payload: {},
  };
};

const updateTemplatePathOutputDocumentsPrint = (
  templateId,
  templatePath,
  newFile
) => {
  return {
    type: constants.TEMPLATE_UPDATE_FOR_OUTPUT_DOCUMENT_PRINT_STATE_PATH,
    payload: {
      templateId: templateId,
      templatePath: templatePath,
      newFile: newFile,
    },
  };
};

const changeDocumentPrintUrlSuccess = (item) => {
  return {
    type: constants.CHANGE_OUTPUT_DOCUMENT_PRINT_URL_SUCCESS,
    payload: item,
  };
};

const changeDocumentPrintUrlFail = (item) => {
  return {
    type: constants.CHANGE_OUTPUT_DOCUMENT_PRINT_URL_FAIL,
    payload: item,
  };
};

export default {
  getOutputDocumentsPrintRequest,
  getOutputDocumentsPrintSuccess,
  getOutputDocumentsPrintFail,
  createOutputDocumentPrintRequest,
  createOutputDocumentPrintSuccess,
  createOutputDocumentPrintFail,
  updateOutputDocumentPrintRequest,
  updateOutputDocumentPrintSuccess,
  updateOutputDocumentPrintFail,
  getParametersForSqlOutputDocumentPrintRequest,
  getParametersForSqlOutputDocumentPrintSuccess,
  getParametersForSqlOutputDocumentPrintFail,
  resetOutputDocumentsPrint,
  updateTemplatePathOutputDocumentsPrint,
  deleteOutputDocumentPrintRequest,
  deleteOutputDocumentPrintSuccess,
  deleteOutputDocumentPrintFail,
  changeDocumentPrintUrlFail,
  changeDocumentPrintUrlSuccess,
  getOutputDocumentTypeRequest,
  getOutputDocumentTypeSuccess,
  getOutputDocumentTypeFail,
};
