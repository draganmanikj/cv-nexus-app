import constants from "./constants";
import workingPositionsConstants from "../DosieComponent/DosieDetails/WorkingPositionsComponent/duck/constants";
import rolesPositionConstatnts from "../DosieComponent/DosieDetails/RolesPositionsComponent/duck/constants"
import privateHealthcareConstants from "../DosieComponent/DosieDetails/PrivateHealthcareComponent/duck/constants"

const defaultState = {
  users: undefined,
  dosie: undefined,
  loading: false,
  workingPositions: undefined,
  rolesPositions: undefined,
  userDosie: undefined,
  privateHealthcare: undefined
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.RESET_DOSIE:
      return defaultState;
    case workingPositionsConstants.RESET_WORKING_POSITIONS:
      return {
        ...currentState,
        workingPositions: defaultState.workingPositions,
      };
    case workingPositionsConstants.EMPTY_LIST:
      return {
        ...currentState,
        workingPositions: []
      }
    case constants.CREATE_DOSIE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.CREATE_DOSIE_SUCCESS:
      return {
        ...currentState,
        dosie: action.payload,
        loading: false,
      };
    case constants.CREATE_DOSIE_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case constants.GET_ALL_DOSIE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_ALL_DOSIE_SUCCESS:
      return {
        ...currentState,
        dosie: action.payload,
        loading: false,
      };
    case constants.GET_ALL_DOSIE_FAIL:
      return {
        ...currentState,
        dosie: defaultState.dosie,
        loading: false,
      };

    case constants.GET_DOSIE_BY_USER_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_DOSIE_BY_USER_SUCCESS:
      return {
        ...currentState,
        userDosie: action.payload,
        loading: false,
      };
    case constants.GET_DOSIE_BY_USER_FAIL:
      return {
        ...currentState,
        userDosie: defaultState.dosie,
        loading: false,
      };

    case constants.UPDATE_DOSIE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.UPDATE_DOSIE_SUCCESS:
      return {
        ...currentState,
        userDosie: action.payload,
        users: currentState.users && currentState.users.map(item => item.id === action.payload.id ? action.payload : item),
        loading: false,
      };
    case constants.UPDATE_DOSIE_FAIL:
      return {
        ...currentState,
        userDosie: defaultState.dosie,
        loading: false,
      };

    case constants.DELETE_DOSIE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.DELETE_DOSIE_SUCCESS:
      return {
        ...currentState,
        dosie: action.payload,
        loading: false,
      };
    case constants.DELETE_DOSIE_FAIL:
      return {
        ...currentState,
        dosie: defaultState.dosie,
        loading: false,
      };
    case constants.GET_FILTERED_USERS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case constants.GET_FILTERED_USERS_SUCCESS:
      return {
        ...currentState,
        users: action.payload,
        loading: false,
      };
    case constants.GET_FILTERED_USERS_FAIL:
      return {
        ...currentState,
        user: defaultState.users,
        loading: false,
      };

    // WORKING POSITIONS
    case workingPositionsConstants.CREATE_WORKING_POSITION_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case workingPositionsConstants.CREATE_WORKING_POSITION_SUCCESS:
      return {
        ...currentState,
        workingPositions: [action.payload, ...currentState.workingPositions],
        loading: false,
      };
    case workingPositionsConstants.CREATE_WORKING_POSITION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case workingPositionsConstants.GET_WORKING_POSITIONS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case workingPositionsConstants.GET_WORKING_POSITIONS_SUCCESS:
      return {
        ...currentState,
        workingPositions: action.payload,
        loading: false,
      };
    case workingPositionsConstants.GET_WORKING_POSITIONS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case workingPositionsConstants.UPDATE_WORKING_POSITION_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case workingPositionsConstants.UPDATE_WORKING_POSITION_SUCCESS:
              return {
        ...currentState,
        workingPositions: currentState.workingPositions.map((wp) => {
          if (wp.id === action.payload.id) 
            return action.payload;
          else return wp}),
        loading: false,
      };
    case workingPositionsConstants.UPDATE_WORKING_POSITION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

       // ROLES POSITIONS
    case rolesPositionConstatnts.CREATE_ROLES_POSITION_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case rolesPositionConstatnts.CREATE_ROLES_POSITION_SUCCESS:
      return {
        ...currentState,
        rolesPositions: [action.payload, ...currentState.rolesPositions],
        loading: false,
      };
    case rolesPositionConstatnts.CREATE_ROLES_POSITION_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case rolesPositionConstatnts.GET_ROLES_POSITIONS_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case rolesPositionConstatnts.GET_ROLES_POSITIONS_SUCCESS:
      return {
        ...currentState,
        rolesPositions: action.payload,
        loading: false,
      };
    case rolesPositionConstatnts.GET_ROLES_POSITIONS_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case rolesPositionConstatnts.UPDATE_ROLES_POSITION_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case rolesPositionConstatnts.UPDATE_ROLES_POSITION_SUCCESS:
              return {
        ...currentState,
        rolesPositions: currentState.rolesPositions.map((wp) => {
          if (wp.id === action.payload.id) 
            return action.payload;
          else return wp}),
        loading: false,
      };
    case rolesPositionConstatnts.UPDATE_ROLES_POSITION_FAIL:
      return {
        ...currentState,
        loading: false,
      };
      case rolesPositionConstatnts.DELETE_ROLES_POSITION_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case rolesPositionConstatnts.DELETE_ROLES_POSITION_SUCCESS:
              return {
        ...currentState,
        rolesPositions: currentState.rolesPositions.filter(e => e.id !== action.payload),       
        loading: false,
      };
    case rolesPositionConstatnts.DELETE_ROLES_POSITION_FAIL:
      return {
        ...currentState,
        loading: false,
      };
      // PRIVATE HEALTHCARE
    case privateHealthcareConstants.CREATE_PRIVATE_HEALTHCARE_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case privateHealthcareConstants.CREATE_PRIVATE_HEALTHCARE_SUCCESS:
      return {
        ...currentState,
        privateHealthcare: currentState.privateHealthcare && [action.payload, ...currentState.privateHealthcare],
        loading: false,
      };
    case privateHealthcareConstants.CREATE_PRIVATE_HEALTHCARE_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case privateHealthcareConstants.GET_PRIVATE_HEALTHCARES_REQUEST:
      return {
        ...currentState,
        loading: true,
      };
    case privateHealthcareConstants.GET_PRIVATE_HEALTHCARES_SUCCESS:
      return {
        ...currentState,
        privateHealthcare: action.payload,
        loading: false,
      };
    case privateHealthcareConstants.GET_PRIVATE_HEALTHCARES_FAIL:
      return {
        ...currentState,
        loading: false,
      };

    case privateHealthcareConstants.UPDATE_PRIVATE_HEALTHCARE_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case privateHealthcareConstants.UPDATE_PRIVATE_HEALTHCARE_SUCCESS:
              return {
        ...currentState,
        privateHealthcare: currentState.privateHealthcare.map((wp) => {
          if (wp.id === action.payload.id) 
            return action.payload;
          else return wp}),
        loading: false,
      };
    case privateHealthcareConstants.UPDATE_PRIVATE_HEALTHCARE_FAIL:
      return {
        ...currentState,
        loading: false,
      };
      case privateHealthcareConstants.DELETE_PRIVATE_HEALTHCARE_REQUEST:
      return {
        ...currentState,
        loading: true,
      }
      case privateHealthcareConstants.DELETE_PRIVATE_HEALTHCARE_SUCCESS:
              return {
        ...currentState,
        privateHealthcare: currentState.privateHealthcare.filter(e => e.id !== action.payload),       
        loading: false,
      };
    case privateHealthcareConstants.DELETE_PRIVATE_HEALTHCARE_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    default:
      return currentState;
  }
}
