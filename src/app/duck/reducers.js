import constants from "./constants";

const defaultState = {
    userinfo: undefined,
    language: "mk",
    action: null,
    titleSearch: undefined
};

export default function reducer(currentState = defaultState, action) {
    switch (action.type) {
        case constants.USER_INFO_RESET:
            return defaultState;

        case constants.HEADER_TITLE_RESET:
            return defaultState;

        case constants.USER_INFO_FETCH_SUCCESS:
            return {
                ...currentState,
                userinfo: {...action.payload, roles: [action.payload.role]},
            };

        case constants.USER_INFO_FETCH_FAIL:
            return {
                ...currentState,
                userinfo: defaultState.userinfo
            };
        
        case constants.LANGUAGE_VALUE_CHANGE:
            return {
                ...currentState,
                language: action.payload
            }
        
        case constants.SET_ACTION:
            return {
                ...currentState,
                action: action.payload
            }

        case constants.HEADER_TITLE_CHANGE:
            return {
                ...currentState,
                titleSearch: action.payload
            };

        default:
            return currentState;
    }
}

