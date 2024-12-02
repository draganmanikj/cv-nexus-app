import constants from "./constants";

const defaultState = {
    degreeEducation: undefined,
    loading: false
}


export default function reducer(currentState = defaultState, action) {
    switch (action.type){
        case constants.RESET_DEGREE_EDUCATION_TYPE:
            return defaultState;
                
            
        case constants.GET_DEGREE_EDUCATION_TYPE_REQUEST:
            return {
                ...currentState,
                degreeEducation: undefined,
                loading: true,
            };
        case constants.GET_DEGREE_EDUCATION_TYPE_SUCCESS:
            return {
                ...currentState,
                degreeEducation: action.payload,
                loading: false
            };
        case constants.GET_DEGREE_EDUCATION_TYPE_FAIL:
            return {
                ...currentState,
                degreeEducation: defaultState.degreeEducation,
                loading: false
            };
        case constants.CREATE_DEGREE_EDUCATION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.CREATE_DEGREE_EDUCATION_TYPE_SUCCESS:
            return{
                ...currentState,
                degreeEducation: currentState.degreeEducation && [action.payload, ...currentState.degreeEducation],
                loading: false
            };
        case constants.CREATE_DEGREE_EDUCATION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.UPDATE_DEGREE_EDUCATION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.UPDATE_DEGREE_EDUCATION_TYPE_SUCCESS:
            return{
                ...currentState,
                
                degreeEducation: currentState.degreeEducation.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
            
        case constants.UPDATE_DEGREE_EDUCATION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        case constants.ACTIVATE_DEGREE_EDUCATION_TYPE_SUCCESS:
         
            return{
                ...currentState,
                
                degreeEducation: currentState.degreeEducation.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DEACTIVATE_DEGREE_EDUCATION_TYPE_SUCCESS:
            
            return{
                ...currentState,
                
                degreeEducation: currentState.degreeEducation.map((pos) => {
                    if(pos.id === action.payload.id){
                        return action.payload;
                    } else return pos;
                }),
                loading: false
            };
        case constants.DELETE_DEGREE_EDUCATION_TYPE_REQUEST:
            return{
                ...currentState,
                loading: true
            };
        case constants.DELETE_DEGREE_EDUCATION_TYPE_SUCCESS:
            return{
                ...currentState,
                degreeEducation: currentState.degreeEducation.filter(item => item.id !== action.payload),
                loading: false
            };
        case constants.DELETE_DEGREE_EDUCATION_TYPE_FAIL:
            return{
                ...currentState,
                loading: false
            };
        
            default:
            return currentState;
    }

}