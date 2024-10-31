import constants from "./constants";

const defaultState = {
  loading: false,
  projects: undefined
};

export default function reducer(currentState = defaultState, action) {

    switch (action.type) {

    case constants.RESET_PROJECTS:
      return {
        ...currentState,
        projects: defaultState.projects,
      };
    case constants.CREATE_PROJECTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_PROJECTS_SUCCESS:
      return {
        ...currentState,
        projects: [action.payload, ...currentState.projects],
        loading: false,
      };
    case constants.CREATE_PROJECTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_PROJECTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_PROJECTS_SUCCESS:
      return {
        ...currentState,
        projects: action.payload,
        loading: false,
      };
    case constants.GET_PROJECTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.UPDATE_PROJECTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.UPDATE_PROJECTS_SUCCESS:
              return {
        ...currentState,
        projects: currentState.projects.map((e) => {
          if (e.id === action.payload.id) 
            return action.payload;
          else return e}),
        loading: false,
      };
    case constants.UPDATE_PROJECTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

      case constants.DELETE_PROJECTS_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.DELETE_PROJECTS_SUCCESS:
              return {
        ...currentState,
        projects: currentState.projects.filter(e => e.id !== action.payload.id),       
        loading: false,
      };
    case constants.DELETE_PROJECTS_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    default:
      return currentState;
  }
}