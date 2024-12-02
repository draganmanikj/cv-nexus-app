import actions from "./actions";
import {
  getUniversity,
  updateUniversity,
  createUniversity,
  deleteUniversity,
} from "../../../api/universityApi.js";

export const createUniversityOperations = (university) => {
  university.status = "1";
  return (dispatch, getState) => {
    dispatch(actions.createUniversityTypeRequest());
    return createUniversity(university)
      .then((returnedItem) => {
        console.log("returnedItem", returnedItem);
        dispatch(actions.createUniversityTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createUniversityTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const getUniversityOperations = (formData) => {
  return (dispatch) => {
    dispatch(actions.getUniversityTypeRequest());
    return getUniversity(formData)
      .then((returnedItem) => {
        dispatch(actions.getUniversityTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getUniversityTypeFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateUniversityOperations = (university, status) => {
  return (dispatch) => {
    if (status === "true") {
      university.status = 1;
    } else if (status === "false") {
      university.status = 0;
    }
    dispatch(actions.updateUniversityTypeRequest());
    return updateUniversity(university)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateUniversityTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateUniversityTypeSuccess(returnedItem));
        else dispatch(actions.updateUniversityTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateUniversityTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteUniversityOperations = (university) => {
  return (dispatch) => {
    dispatch(actions.deleteUniversityTypeRequest());
    return deleteUniversity(university)
      .then((returnedItem) => {
        dispatch(actions.deleteUniversityTypeSuccess(university));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteUniversityTypeFail(e));
        return Promise.reject(e);
      });
  };
};

const resetUniversityOperations = () => {
  return (dispatch) => {
    return dispatch(actions.resetUniversity());
  };
};

export default {
  createUniversityOperations,
  getUniversityOperations,
  updateUniversityOperations,
  deleteUniversityOperations,
  resetUniversityOperations,
};
