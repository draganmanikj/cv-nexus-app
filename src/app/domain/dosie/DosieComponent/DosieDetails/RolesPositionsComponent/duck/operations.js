import actions from "./actions";
import {
  createRolesPosition,
  updateRolesPosition,
  getRolesPositions,
  deleteRolesPosition,
  getRolesPositionsById,
} from "../../../../../../api/rolesPositionsDosieApi";

export const createRolesPos = (workingPosition) => {
  return (dispatch, getState) => {
    dispatch(actions.createRolesPositionRequest());
    return createRolesPosition(workingPosition)
      .then((returnedItem) => {
        dispatch(actions.createRolesPositionSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createRolesPositionFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchRolesPositions = (formData) => {
  return (dispatch) => {
    dispatch(actions.getRolesPositionsRequest());

    return getRolesPositions(formData)
      .then((returnedItem) => {
        dispatch(actions.getRolesPositionsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getRolesPositionsFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchRolesPositionsById = (id) => {
  return (dispatch) => {
    dispatch(actions.getRolesPositionsRequest());

    return getRolesPositionsById(id)
      .then((returnedItem) => {
        dispatch(actions.getRolesPositionsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getRolesPositionsFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateRolesPos = (workingPosition, status) => {
  return (dispatch) => {
    dispatch(actions.updateRolesPositionRequest());
    return updateRolesPosition(workingPosition)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateRolesPositionSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateRolesPositionSuccess(returnedItem));
        else dispatch(actions.updateRolesPositionSuccess(workingPosition));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateRolesPositionFail(e));
        return Promise.reject(e);
      });
  };
};
export const deleteRolesPos = (workingPosition) => {
  return (dispatch) => {
    dispatch(actions.deleteRolesPositionRequest());
    return deleteRolesPosition(workingPosition)
      .then((returnedItem) => {
        dispatch(actions.deleteRolesPositionSuccess(workingPosition));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteRolesPositionFail(e));
        return Promise.reject(e);
      });
  };
};

const resetRolesPos = () => {
  return (dispatch) => {
    return dispatch(actions.resetRolesPositions());
  };
};

export default {
  resetRolesPos,
  createRolesPos,
  fetchRolesPositions,
  updateRolesPos,
  deleteRolesPos,
  fetchRolesPositionsById,
};
