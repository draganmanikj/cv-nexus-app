import actions from "./actions";
import {
     createWorkingPositionType,
    updateWorkingPositionType,
    getWorkingPositionTypes,
    deleteWorkingPositionType
} from '../../../api/workingPositionTypesApi';

export const createWorkingPosType = (workingPositionType) => {
    workingPositionType.status = 1;
    return (dispatch, getState) => {
        dispatch(actions.createWorkingPositionTypeRequest());
        return createWorkingPositionType(workingPositionType)
            .then(returnedItem => {
                dispatch(actions.createWorkingPositionTypeSuccess(returnedItem));
                return Promise.resolve(returnedItem);
            })
            .catch(e => {
                dispatch(actions.createWorkingPositionTypeFail(e));
                return Promise.reject(e);
            });
    };
};

export const fetchWorkingPositionTypes = (formData) => {
    return dispatch => {
        dispatch(actions.getWorkingPositionTypesRequest());

        return getWorkingPositionTypes(formData)
            .then(returnedItem => {
                dispatch(actions.getWorkingPositionTypesSuccess(returnedItem));
                return Promise.resolve(returnedItem);
            })
            .catch(e => {
                dispatch(actions.getWorkingPositionTypesFail(e));
                Promise.resolve(e);
            });
    };
};

export const updateWorkingPosType = (workingPositionType, status) => {
    return dispatch => {
        if(status === "true"){
            workingPositionType.status = 1;
        }
        else if(status === "false"){
            workingPositionType.status = 0;
        }
        dispatch(actions.updateWorkingPositionTypeRequest());
        return updateWorkingPositionType(workingPositionType)
            .then(returnedItem => {
                if (status === "true")
                    dispatch(actions.activateWorkingPositionTypeSuccess(returnedItem));
                else if (status === "false")
                    dispatch(actions.deactivateWorkingPositionTypeSuccess(returnedItem));
                else
                    dispatch(actions.updateWorkingPositionTypeSuccess(workingPositionType));
                return Promise.resolve(returnedItem);
            })
            .catch(e => {
                dispatch(actions.updateWorkingPositionTypeFail(e));
                return Promise.reject(e);
            });
    };
};
export const deleteWorkingPosType = (workingPositionType) => {
    return dispatch => {
        dispatch(actions.deleteWorkingPositionTypeRequest());
        return deleteWorkingPositionType(workingPositionType)
            .then(returnedItem => {
                dispatch(actions.deleteWorkingPositionTypeSuccess(workingPositionType));
                return Promise.resolve(returnedItem);
            })
            .catch(e => {
                dispatch(actions.deleteWorkingPositionTypeFail(e));
                return Promise.reject(e);
            });
    };
};

const resetWorkingPosType = () => {
    return (dispatch) => {
        return dispatch(actions.resetWorkingPositionTypes());
    };
};

export default {
    resetWorkingPosType,
    createWorkingPosType,
    fetchWorkingPositionTypes,
    updateWorkingPosType,
    deleteWorkingPosType
};

