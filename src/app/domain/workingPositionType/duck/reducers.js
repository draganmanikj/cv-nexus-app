import constants from "./constants";

const defaultState = {
    workingPositionTypes: undefined,
    loading: false
};

export default function reducer(currentState = defaultState, action) {
    switch (action.type) {
        case constants.RESET_WORKING_POSITION_TYPES:
            return defaultState;

        case constants.GET_WORKING_POSITION_TYPES_REQUEST:
            return {
                ...currentState,
                workingPositionTypes: undefined,
                loading: true
            };
        case constants.GET_WORKING_POSITION_TYPES_SUCCESS:
            return {
                ...currentState,
                workingPositionTypes: action.payload,
                loading: false
            };
        case constants.GET_WORKING_POSITION_TYPES_FAIL:
            return {
                ...currentState,
                workingPositionTypes: defaultState.workingPositionTypes,
                loading: false
            };

        case constants.CREATE_WORKING_POSITION_TYPE_REQUEST:
            return {
                ...currentState,
                loading: true
            };
        case constants.CREATE_WORKING_POSITION_TYPE_SUCCESS:
            return {
                ...currentState,
                workingPositionTypes: [action.payload, ...currentState.workingPositionTypes],
                loading: false
            };
        case constants.CREATE_WORKING_POSITION_TYPE_FAIL:
            return {
                ...currentState,
                loading: false
            };

        case constants.UPDATE_WORKING_POSITION_TYPE_REQUEST:
            return {
                ...currentState,
                loading: true
            };
        case constants.UPDATE_WORKING_POSITION_TYPE_SUCCESS:
            return {
                ...currentState,
                workingPositionTypes: currentState.workingPositionTypes.map((pos) => {
                    if (pos.id === action.payload.id)
                        return action.payload;
                    else return pos;
                }),
                loading: false
            }
        case constants.UPDATE_WORKING_POSITION_TYPE_FAIL:
            return {
                ...currentState,
                loading: false
            };

        case constants.ACTIVATE_WORKING_POSITION_TYPE_SUCCESS:
            return {
                ...currentState,
                loading: false
            };

        case constants.DEACTIVATE_WORKING_POSITION_TYPE_SUCCESS:
            return {
                ...currentState,
                loading: false
            };
        case constants.DELETE_WORKING_POSITION_TYPE_REQUEST:
            return {
                ...currentState,
                loading: true
            };
        case constants.DELETE_WORKING_POSITION_TYPE_SUCCESS:
            return {
                ...currentState,
                workingPositionTypes: currentState.workingPositionTypes.filter(item => item.id !== action.payload),
                loading: false   
            };
        case constants.DELETE_WORKING_POSITION_TYPE_FAIL:
            return {
                ...currentState,
                loading: false
            };

        default:
            return currentState;
    }
}