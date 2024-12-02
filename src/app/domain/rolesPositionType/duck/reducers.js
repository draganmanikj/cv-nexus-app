import constants from "./constants";

const defaultState = {
    rolePositionTypes: undefined,
    loading: false
}

export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_ROLE_POSITION_TYPES:
            return defaultState;
                
            
        case constants.GET_ROLE_POSITION_TYPES_REQUEST:
            return {
                ...currentState,
                rolePositionTypes: undefined,
                loading: true,
            };
        case constants.GET_ROLE_POSITION_TYPES_SUCCESS:
            return {
                ...currentState,
                rolePositionTypes: action.payload,
                loading: false
            };
        case constants.GET_ROLE_POSITION_TYPES_FAIL:
            return {
                ...currentState,
                rolePositionTypes: defaultState.rolePositionTypes,
                loading: false
            };
        case constants.CREATE_ROLE_POSITION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_ROLE_POSITION_TYPE_SUCCESS:
            return{
                ...currentState,
                rolePositionTypes: currentState.rolePositionTypes && [action.payload, ...currentState.rolePositionTypes],
                loading: false
            };
        case constants.CREATE_ROLE_POSITION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_ROLE_POSITION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_ROLE_POSITION_TYPE_SUCCESS:
            return{
                ...currentState,
                rolePositionTypes: currentState.rolePositionTypes.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.UPDATE_ROLE_POSITION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_ROLE_POSITION_TYPE_SUCCESS:
            return{
                ...currentState,
                rolePositionTypes: currentState.rolePositionTypes.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_ROLE_POSITION_TYPE_SUCCESS:  
            return{
                ...currentState,
                rolePositionTypes: currentState.rolePositionTypes.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_ROLE_POSITION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_ROLE_POSITION_TYPE_SUCCESS:
            return{
                ...currentState,
                rolePositionTypes: currentState.rolePositionTypes.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_ROLE_POSITION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}