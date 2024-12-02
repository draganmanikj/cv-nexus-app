import constants from "./constants";

const defaultState = {
  languagesTypes: undefined,
  loading: false,
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.RESET_LANGUAGES_TYPES:
      return defaultState;

    case constants.GET_LANGUAGES_TYPES_REQUEST:
      return {
        ...currentState,
        languagesTypes: undefined,
        loading: true,
      };
    case constants.GET_LANGUAGES_TYPES_SUCCESS:
      return {
        ...currentState,
        languagesTypes: action.payload,
        loading: false,
      };
    case constants.GET_LANGUAGES_TYPES_FAIL:
      return {
        ...currentState,
        languagesTypes: defaultState.languagesTypes,
        loading: false,
      };

    case constants.CREATE_LANGUAGES_TYPE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_LANGUAGES_TYPE_SUCCESS:
      return {
        ...currentState,
        languagesTypes: currentState.languagesTypes &&  [action.payload, ...currentState.languagesTypes],
        loading: false,
      };
    case constants.CREATE_LANGUAGES_TYPE_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    case constants.UPDATE_LANGUAGES_TYPE_SUCCESS:
      return {
        ...currentState,
        languagesTypes: currentState.languagesTypes.map((languageType) => {
          if (languageType.id === action.payload.id)
            return action.payload;
          else return languageType;
        }),
        loading: false,
      };
      case constants.DELETE_LANGUAGES_TYPE_REQUEST:
          return {
              ...currentState,
              loading: true
          };
      case constants.DELETE_LANGUAGES_TYPE_SUCCESS:
          return {
              ...currentState,
              languagesTypes: currentState.languagesTypes.filter(item => item.id !== action.payload),
              loading: false   
          };
      case constants.DELETE_LANGUAGES_TYPE_FAIL:
          return {
              ...currentState,
              loading: false
          };

    default:
      return currentState;
  }
}
