import constants from "./constants";

const defaultState = {
    faculty: undefined,
    loading: false
}


export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_FACULTY_TYPE:
            return defaultState;
                
            
        case constants.GET_FACULTY_TYPE_REQUEST:
            return {
                ...currentState,
                faculty: undefined,
                loading: true,
            };
        case constants.GET_FACULTY_TYPE_SUCCESS:
            return {
                ...currentState,
                faculty: action.payload,
                loading: false
            };
        case constants.GET_FACULTY_TYPE_FAIL:
            return {
                ...currentState,
                faculty: defaultState.faculty,
                loading: false
            };
        case constants.CREATE_FACULTY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_FACULTY_TYPE_SUCCESS:
            return{
                ...currentState,
                faculty: currentState.faculty && [action.payload, ...currentState.faculty],
                loading: false
            };
        case constants.CREATE_FACULTY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_FACULTY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_FACULTY_TYPE_SUCCESS:
            return{
                ...currentState,
                
                faculty: currentState.faculty.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
            
        case constants.UPDATE_FACULTY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_FACULTY_TYPE_SUCCESS:
         
            return{
                ...currentState,
                
                faculty: currentState.faculty.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_FACULTY_TYPE_SUCCESS:
            
            return{
                ...currentState,
                
                faculty: currentState.faculty.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_FACULTY_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_FACULTY_TYPE_SUCCESS:
            return{
                ...currentState,
                faculty: currentState.faculty.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_FACULTY_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}