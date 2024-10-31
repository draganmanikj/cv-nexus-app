import constants from "./constants";

const defaultState = {
  loading: false,
  languages: undefined
};

export default function reducer(currentState = defaultState, action) {

    switch (action.type) {

    case constants.RESET_LANGUAGES:
      return {
        ...currentState,
        languages: defaultState.languages,
      };
    case constants.CREATE_LANGUAGES_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_LANGUAGES_SUCCESS:
      return {
        ...currentState,
        languages: [action.payload, ...currentState.languages],
        loading: false,
      };
    case constants.CREATE_LANGUAGES_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_LANGUAGES_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_LANGUAGES_SUCCESS:
      return {
        ...currentState,
        languages: action.payload,
        loading: false,
      };
    case constants.GET_LANGUAGES_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.UPDATE_LANGUAGES_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.UPDATE_LANGUAGES_SUCCESS:
              return {
        ...currentState,
        languages: currentState.languages.map((e) => {
          if (e.id === action.payload.id) 
            return action.payload;
          else return e}),
        loading: false,
      };
    case constants.UPDATE_LANGUAGES_FAIL:
      return {
        ...currentState,
        loading: false,
      };

      case constants.DELETE_LANGUAGES_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.DELETE_LANGUAGES_SUCCESS:
              return {
        ...currentState,
        languages: currentState.languages.filter(e => e.id !== action.payload.id),       
        loading: false,
      };
    case constants.DELETE_LANGUAGES_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    default:
      return currentState;
  }
}