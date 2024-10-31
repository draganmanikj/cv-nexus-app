import constants from "./constants";

const defaultState = {
  loading: false,
  trainings: undefined
};



export default function reducer(currentState = defaultState, action) {

    switch (action.type) {

    case constants.RESET_TRAININGS:
      return {
        ...currentState,
        trainings: defaultState.trainings,
      };
    case constants.CREATE_TRAININGS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_TRAININGS_SUCCESS:
      return {
        ...currentState,
        trainings: [action.payload, ...currentState.trainings],
        loading: false,
      };
    case constants.CREATE_TRAININGS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_TRAININGS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_TRAININGS_SUCCESS:
      return {
        ...currentState,
        trainings: action.payload,
        loading: false,
      };
    case constants.GET_TRAININGS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.UPDATE_TRAININGS_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.UPDATE_TRAININGS_SUCCESS:
              return {
        ...currentState,
        trainings: currentState.trainings.map((e) => {
          if (e.id === action.payload.id) 
            return action.payload;
          else return e}),
        loading: false,
      };
    case constants.UPDATE_TRAININGS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

      case constants.DELETE_TRAININGS_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case constants.DELETE_TRAININGS_SUCCESS:
              return {
        ...currentState,
        trainings: currentState.trainings.filter(e => e.id !== action.payload.id),       
        loading: false,
      };
    case constants.DELETE_TRAININGS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

      
    default:
      return currentState;
  }
}