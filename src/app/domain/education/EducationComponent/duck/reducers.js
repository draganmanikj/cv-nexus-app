import constants from "./constants";

const defaultState = {
  loading: false,
  education: undefined
};

export default function reducer(currentState = defaultState, action) {

    switch (action.type) {

    case constants.RESET_EDUCATIONS:
      return {
        ...currentState,
        education: defaultState.education,
      };
    case constants.CREATE_EDUCATION_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_EDUCATION_SUCCESS:
      return {
        ...currentState,
        education: [action.payload, ...currentState.education],
        loading: false,
      };
    case constants.CREATE_EDUCATION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_EDUCATION_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_EDUCATION_SUCCESS:
      return {
        ...currentState,
        education: action.payload,
        loading: false,
      };
    case constants.GET_EDUCATION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.UPDATE_EDUCATION_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.UPDATE_EDUCATION_SUCCESS:
              return {
        ...currentState,
        education: currentState.education.map((e) => {
          if (e.id === action.payload.id) 
            return action.payload;
          else return e}),
        loading: false,
      };
    case constants.UPDATE_EDUCATION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

      case constants.DELETE_EDUCATION_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.DELETE_EDUCATION_SUCCESS:
              return {
        ...currentState,
        education: currentState.education.filter(e => e.id !== action.payload.id),       
        loading: false,
      };
    case constants.DELETE_EDUCATION_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    default:
      return currentState;
  }
}