import actions from "./actions";
import {
  createWorkingPosition,
  updateWorkingPosition,
  getWorkingPositions,
  deleteWorkingPosition,
  getWorkingPositionsById,
} from "../../../../../../api/workingPositions";

export const createWorkingPos = (workingPosition) => {
  return (dispatch, getState) => {
    dispatch(actions.createWorkingPositionRequest());
    return createWorkingPosition(workingPosition)
      .then((returnedItem) => {
        dispatch(actions.createWorkingPositionSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createWorkingPositionFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchWorkingPositions = (formData) => {
  return (dispatch) => {
    dispatch(actions.getWorkingPositionsRequest());

    return getWorkingPositions(formData)
      .then((returnedItem) => {
        dispatch(actions.getWorkingPositionsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getWorkingPositionsFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchWorkingPositionsById = (id) => {
  return (dispatch) => {
    dispatch(actions.getWorkingPositionsRequest());

    return getWorkingPositionsById(id)
      .then((returnedItem) => {
        dispatch(actions.getWorkingPositionsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getWorkingPositionsFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateWorkingPos = (workingPosition, status) => {
  return (dispatch) => {
    if (workingPosition.status === true) {
      workingPosition.status = 1;
    } else if (workingPosition.status === false) {
      workingPosition.status = 0;
    }
    dispatch(actions.updateWorkingPositionRequest());
    return updateWorkingPosition(workingPosition)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateWorkingPositionSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateWorkingPositionSuccess(returnedItem));
        else dispatch(actions.updateWorkingPositionSuccess({...workingPosition,
          ...(workingPosition.dateTo) && {status:0}
        }));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateWorkingPositionFail(e));
        return Promise.reject(e);
      });
  };
};
export const deleteWorkingPos = (workingPosition) => {
  return (dispatch) => {
    dispatch(actions.deleteWorkingPositionRequest());
    return deleteWorkingPosition(workingPosition)
      .then((returnedItem) => {
        dispatch(actions.deleteWorkingPositionuccess(workingPosition));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteWorkingPositionFail(e));
        return Promise.reject(e);
      });
  };
};

const resetWorkingPos = () => {
  return (dispatch) => {
    return dispatch(actions.resetWorkingPosition());
  };
};

export default {
  resetWorkingPos,
  createWorkingPos,
  fetchWorkingPositions,
  updateWorkingPos,
  deleteWorkingPos,
  fetchWorkingPositionsById,
};
