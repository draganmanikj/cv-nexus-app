import constants from "./constants";

const defaultState = {
  documents: undefined,
  loading: false,
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.CREATE_DOCUMENT_REQUEST:
      return {
        ...currentState,
        //document: undefined,
      };
    case constants.CREATE_DOCUMENT_SUCCESS:
      return {
        ...currentState,
        documents: [action.payload, ...currentState.documents],
        loading: false,
      };
    case constants.CREATE_DOCUMENT_FAIL:
      return {
        ...currentState,
        documents: defaultState.documents,
      };

    case constants.GET_DOCUMENTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };

    case constants.GET_DOCUMENTS_SUCCESS:
      return {
        ...currentState,
        documents: action.payload,
        loading: false,
      };

    case constants.GET_DOCUMENTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_DOCUMENTS_BY_DOSIE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };

    case constants.GET_DOCUMENTS_BY_DOSIE_SUCCESS:
      return {
        ...currentState,
        documents: action.payload,
        loading: false,
      };

    case constants.GET_DOCUMENTS_BY_DOSIE_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.DELETE_DOCUMENTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.DELETE_DOCUMENTS_SUCCESS:
              return {
        ...currentState,
        documents: currentState.documents.filter(e => e.id !== action.payload.id),       
        loading: false,
      };
    case constants.DELETE_DOCUMENTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.UPDATE_DOCUMENT_REQUEST:
      return {
        ...currentState,
        loading: true
      };

    case constants.UPDATE_DOCUMENT_SUCCESS:
      return {
        ...currentState,
        documents: currentState.documents.map((document) => {
          if (document.id === action.payload.id)
            return action.payload;
          else return document;
        }),
        loading: false
      };
    case constants.UPDATE_DOCUMENT_FAIL:
      return {
        ...currentState,
       loading: false
      };

    case constants.UPLOAD_DOCUMENT_REQUEST:
      return {
        ...currentState,
        document: undefined,
      };
    case constants.UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...currentState,
        document: action.payload,
      };
    case constants.UPLOAD_DOCUMENT_FAIL:
      return {
        ...currentState,
        document: defaultState.document,
      };

    default:
      return currentState;
  }
}
