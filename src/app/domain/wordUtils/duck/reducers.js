import constants from "./constants";

const defaultState = {
    loading: undefined
};

export default function reducer(currentState = defaultState, action) {
    switch (action.type) {
        case constants.TEMPLATES_GENERATE_REQUEST: {
            return {
                loading: true
            };
        }

        case constants.TEMPLATES_GENERATE_SUCCESS: {
            return {
                loading: defaultState.loading
            }
        }

        case constants.TEMPLATES_GENERATE_FAIL: {
            return {
                loading: defaultState.loading
            }
        }

        default:
            return currentState;
    }
}

