import constants from "./constants";

const defaultState = {
  outputDocumentsPrint: undefined,
  loading: false,
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.RESET_OUTPUT_DOCUMENTS_PRINT:
      return defaultState;

    case constants.GET_OUTPUT_DOCUMENTS_PRINT_REQUEST:
      return {
        ...currentState,
        outputDocumentsPrint: defaultState.outputDocumentsPrint,
        loading: true,
      };
    case constants.GET_OUTPUT_DOCUMENTS_PRINT_SUCCESS:
      return {
        ...currentState,
        outputDocumentsPrint: action.payload,
        loading: defaultState.loading,
      };
    case constants.GET_OUTPUT_DOCUMENTS_PRINT_FAIL:
      return {
        ...currentState,
        outputDocumentsPrint: defaultState.outputDocumentsPrint,
        loading: defaultState.loading,
      };
    case constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_FAIL:
      return {
        ...currentState,
        loading: defaultState.loading,
      };
    case constants.GET_PARAMETERS_FOR_OUTPUT_DOCUMENT_PRINT_SQL_SUCCESS:
      return {
        ...currentState,
        loading: defaultState.loading,
      };
    case constants.CHANGE_OUTPUT_DOCUMENT_PRINT_URL_SUCCESS:
      return {
        ...currentState,
        loading: defaultState.loading,
      };
    case constants.CHANGE_OUTPUT_DOCUMENT_PRINT_URL_FAIL:
      return {
        ...currentState,
        loading: defaultState.loading,
      };
    case constants.TEMPLATE_UPDATE_FOR_OUTPUT_DOCUMENT_PRINT_STATE_PATH: {
      const docs = currentState.outputDocumentsPrint.map((doc) => {
        if (doc.id !== action.payload.templateId) return doc;
        else {
          doc.templatePath = action.payload.templatePath;
          doc.file = action.payload.newFile;
          return doc;
        }
      });
      return {
        ...currentState,
        outputDocumentsPrint: docs,
      };
    }
    case constants.CREATE_OUTPUT_DOCUMENT_PRINT_REQUEST:
      return {
        ...currentState,
        outputDocumentsPrint: currentState.outputDocumentsPrint,
        loading: true,
      };
    case constants.CREATE_OUTPUT_DOCUMENT_PRINT_SUCCESS: {
      return {
        ...currentState,
        outputDocumentsPrint: currentState.outputDocumentsPrint
          ? [...currentState.outputDocumentsPrint, action.payload]
          : [action.payload],
        loading: defaultState.loading,
      };
    }
    case constants.CREATE_OUTPUT_DOCUMENT_PRINT_FAIL:
      return {
        ...currentState,
        loading: defaultState.loading,
      };
    case constants.UPDATE_OUTPUT_DOCUMENT_PRINT_REQUEST:
      return {
        ...currentState,
        outputDocumentsPrint: currentState.outputDocumentsPrint,
        loading: true,
      };
    case constants.UPDATE_OUTPUT_DOCUMENT_PRINT_SUCCESS:
      return {
        ...currentState,
        outputDocumentsPrint:
          action.payload !== undefined
            ? currentState.outputDocumentsPrint.map((doc) =>
                doc.id !== action.payload.id ? doc : action.payload
              )
            : currentState.outputDocumentsPrint,
        loading: false,
      };
    case constants.UPDATE_OUTPUT_DOCUMENT_PRINT_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    case constants.DELETE_OUTPUT_DOCUMENT_PRINT_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.DELETE_OUTPUT_DOCUMENT_PRINT_SUCCESS:
      return {
        ...currentState,
        outputDocumentsPrint: currentState.outputDocumentsPrint.filter(item => item.id !== action.payload),
        loading: false,
      };
    case constants.DELETE_OUTPUT_DOCUMENT_PRINT_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    default:
      return currentState;
  }
}
