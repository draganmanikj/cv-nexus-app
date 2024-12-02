import constants from "./constants";

const defaultState = {
    country: undefined,
    loading: false
}

export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_COUNTRY_TYPE:
            return defaultState;
                
            
        case constants.GET_COUNTRY_TYPE_REQUEST:
            return {
                ...currentState,
                country: undefined,
                loading: true,
            };
        case constants.GET_COUNTRY_TYPE_SUCCESS:
            return {
                ...currentState,
                country: action.payload,
                loading: false
            };
        case constants.GET_COUNTRY_TYPE_FAIL:
            return {
                ...currentState,
                country: defaultState.country,
                loading: false
            };
        case constants.CREATE_COUNTRY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_COUNTRY_TYPE_SUCCESS:
            return{
                ...currentState,
                country: currentState.country && [action.payload, ...currentState.country],
                loading: false
            };
        case constants.CREATE_COUNTRY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_COUNTRY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_COUNTRY_TYPE_SUCCESS:
            return{
                ...currentState,
                
                country: currentState.country.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
            
        case constants.UPDATE_COUNTRY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_COUNTRY_TYPE_SUCCESS:
         
            return{
                ...currentState,
                
                country: currentState.country.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_COUNTRY_TYPE_SUCCESS:
            
            return{
                ...currentState,
                
                country: currentState.country.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_COUNTRY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_COUNTRY_TYPE_SUCCESS:
            return{
                ...currentState,
                country: currentState.country.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_COUNTRY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}