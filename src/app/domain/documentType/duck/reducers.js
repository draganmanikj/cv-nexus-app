import constants from "./constants";

const defaultState = {
  documentTypes: undefined,
  loading: false,
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.RESET_DOCUMENT_TYPES:
      return defaultState;

    case constants.GET_DOCUMENT_TYPES_REQUEST:
      return {
        ...currentState,
        documentTypes: undefined,
        loading: true,
      };
    case constants.GET_DOCUMENT_TYPES_SUCCESS:
      return {
        ...currentState,
        documentTypes: action.payload,
        loading: false,
      };
    case constants.GET_DOCUMENT_TYPES_FAIL:
      return {
        ...currentState,
        documentTypes: defaultState.documentTypes,
        loading: false,
      };

    case constants.CREATE_DOCUMENT_TYPE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_DOCUMENT_TYPE_SUCCESS:
      return {
        ...currentState,
        documentTypes: [action.payload, ...currentState.documentTypes],
        loading: false,
      };
    case constants.CREATE_DOCUMENT_TYPE_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    case constants.UPDATE_DOCUMENT_TYPE_SUCCESS:
      return {
        ...currentState,
        documentTypes: currentState.documentTypes.map((documentType) => {
          if (documentType.id === action.payload.id)
            return action.payload;
          else return documentType;
        }),
        loading: false,
      };
      case constants.DELETE_DOCUMENT_TYPE_REQUEST:
          return {
              ...currentState,
              loading: true
          };
      case constants.DELETE_DOCUMENT_TYPE_SUCCESS:
          return {
              ...currentState,
              documentTypes: currentState.documentTypes.filter(item => item.id !== action.payload),
              loading: false   
          };
      case constants.DELETE_DOCUMENT_TYPE_FAIL:
          return {
              ...currentState,
              loading: false
          };

    default:
      return currentState;
  }
}
