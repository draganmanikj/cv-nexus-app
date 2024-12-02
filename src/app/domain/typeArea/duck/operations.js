import actions from "./actions";
import {
  getTypeArea,
  createTypeArea,
  deleteTypeArea,
  updateTypeArea,
} from "../../../api/typeAreaApi.js";

export const createTypeAreaOperations = (areatype) => {
  areatype.status = "1";
  return (dispatch, getState) => {
    dispatch(actions.createTypeAreaTypeRequest());
    return createTypeArea(areatype)
      .then((returnedItem) => {
        console.log("returnedItem", returnedItem);
        dispatch(actions.createTypeAreaTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createTypeAreaTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const getTypeAreaOperations = (formData) => {
  return (dispatch) => {
    dispatch(actions.getTypeAreaTypeRequest());
    return getTypeArea(formData)
      .then((returnedItem) => {
        dispatch(actions.getTypeAreaTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getTypeAreaTypeFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateTypeAreaOperations = (areatype, status) => {
  return (dispatch) => {
    if (status === "true") {
      areatype.status = 1;
    } else if (status === "false") {
      areatype.status = 0;
    }
    dispatch(actions.updateTypeAreaTypeRequest());
    return updateTypeArea(areatype)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateTypeAreaTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.activateTypeAreaTypeSuccess(returnedItem));
        else dispatch(actions.updateTypeAreaTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateTypeAreaTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteTypeAreaOperations = (areatype) => {
  return (dispatch) => {
    dispatch(actions.deleteTypeAreaTypeRequest());
    return deleteTypeArea(areatype)
      .then((returnedItem) => {
        dispatch(actions.deleteTypeAreaTypeSuccess(areatype));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteTypeAreaTypeFail(e));
        return Promise.reject(e);
      });
  };
};

const resetTypeAreaOperations = () => {
  return (dispatch) => {
    return dispatch(actions.resetTypeArea());
  };
};

export default {
  resetTypeAreaOperations,
  getTypeAreaOperations,
  updateTypeAreaOperations,
  createTypeAreaOperations,
  deleteTypeAreaOperations,
};
