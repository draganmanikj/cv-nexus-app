import actions from "./actions";
import {
  createRolePosition,
  getRolePosition,
  updateRolePosition,
  deleteRolePosition,
} from "../../../api/rolePositiotTypesApi";

export const createRole = (rolePosition) => {
  rolePosition.status = 1;
  return (dispatch, getState) => {
    dispatch(actions.createRolePositionTypeRequest());
    return createRolePosition(rolePosition)
      .then((returnedItem) => {
        dispatch(actions.createRolePositionTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createRolePositionTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchRole = (formData) => {
  return (dispatch) => {
    dispatch(actions.getRolePositionTypeRequest);

    return getRolePosition(formData)
      .then((returnedItem) => {
        dispatch(actions.getRolePositionTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getRolePositionTypeFail(e));
        Promise.resolve(e);
      });
  };
};
export const updateRole = (rolePositionType, status) => {
  return (dispatch) => {
    if (status === "true") {
      rolePositionType.status = 1;
    } else if (status === "false") {
      rolePositionType.status = 0;
    }
    dispatch(actions.updateRolePositionTypeRequest());
    return updateRolePosition(rolePositionType)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateRolePositionTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateRolePositionTypeSuccess(returnedItem));
        else dispatch(actions.updateRolePositionTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateRolePositionTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteRole = (rolePosition) => {
  return (dispatch) => {
    dispatch(actions.deleteRolePositionTypeRequest());
    return deleteRolePosition(rolePosition)
      .then((returnedItem) => {
        dispatch(actions.deleteRolePositionTypeSuccess(rolePosition));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteRolePositionTypeFail(e));
        return Promise.reject(e);
      });
  };
};
const resetRolePosType = () => {
  return (dispatch) => {
    return dispatch(actions.resetRolePositionTypes());
  };
};

export default {
  createRole,
  fetchRole,
  updateRole,
  deleteRole,
  resetRolePosType,
};
