import constants from "./constants";

const defaultState = {
    university: undefined,
    loading: false
}


export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_UNIVERSITY_TYPE:
            return defaultState;
                
            
        case constants.GET_UNIVERSITY_TYPE_REQUEST:
            return {
                ...currentState,
                university: undefined,
                loading: true,
            };
        case constants.GET_UNIVERSITY_TYPE_SUCCESS:
            return {
                ...currentState,
                university: action.payload,
                loading: false
            };
        case constants.GET_UNIVERSITY_TYPE_FAIL:
            return {
                ...currentState,
                university: defaultState.university,
                loading: false
            };
        case constants.CREATE_UNIVERSITY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_UNIVERSITY_TYPE_SUCCESS:
            return{
                ...currentState,
                university: currentState.university && [action.payload, ...currentState.university],
                loading: false
            };
        case constants.CREATE_UNIVERSITY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_UNIVERSITY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_UNIVERSITY_TYPE_SUCCESS:
            return{
                ...currentState,
                
                university: currentState.university.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
            
        case constants.UPDATE_UNIVERSITY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_UNIVERSITY_TYPE_SUCCESS:
         
            return{
                ...currentState,
                
                university: currentState.university.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_UNIVERSITY_TYPE_SUCCESS:
            
            return{
                ...currentState,
                
                university: currentState.university.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_UNIVERSITY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_UNIVERSITY_TYPE_SUCCESS:
            return{
                ...currentState,
                university: currentState.university.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_UNIVERSITY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}