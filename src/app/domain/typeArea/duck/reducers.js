import constants from "./constants";

const defaultState = {
    typeArea: undefined,
    loading: false
}


export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_TYPE_AREA_TYPE:
            return defaultState;
                
            
        case constants.GET_TYPE_AREA_TYPE_REQUEST:
            return {
                ...currentState,
                typeArea: undefined,
                loading: true,
            };
        case constants.GET_TYPE_AREA_TYPE_SUCCESS:
            return {
                ...currentState,
                typeArea: action.payload,
                loading: false
            };
        case constants.GET_TYPE_AREA_TYPE_FAIL:
            return {
                ...currentState,
                typeArea: defaultState.typeArea,
                loading: false
            };
        case constants.CREATE_TYPE_AREA_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_TYPE_AREA_TYPE_SUCCESS:
            return{
                ...currentState,
                typeArea: currentState.typeArea && [action.payload, ...currentState.typeArea],
                loading: false
            };
        case constants.CREATE_TYPE_AREA_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_TYPE_AREA_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_TYPE_AREA_TYPE_SUCCESS:
            return{
                ...currentState,
                
                typeArea: currentState.typeArea.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
            
        case constants.UPDATE_TYPE_AREA_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_TYPE_AREA_TYPE_SUCCESS:
         
            return{
                ...currentState,
                
                typeArea: currentState.typeArea.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_TYPE_AREA_TYPE_SUCCESS:
            
            return{
                ...currentState,
                
                typeArea: currentState.typeArea.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_TYPE_AREA_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_TYPE_AREA_TYPE_SUCCESS:
            return{
                ...currentState,
                typeArea: currentState.typeArea.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_TYPE_AREA_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}