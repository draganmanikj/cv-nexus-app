import actions from "./actions";
import {
  createDegreeEducation,
  deleteDegreeEducation,
  updateDegreeEducation,
  getDegreeEducation,
} from "../../../api/degreeEducationApi.js";

export const createDegreeEducationOperations = (degreeEducation) => {
  degreeEducation.status = "1";
  return (dispatch, getState) => {
    dispatch(actions.createDegreeEducationTypeRequest());
    return createDegreeEducation(degreeEducation)
      .then((returnedItem) => {
        dispatch(actions.createDegreeEducationTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createDegreeEducationTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const updateDegreeEducationOperations = (degreeEducation, status) => {
  return (dispatch) => {
    if (status === "true") {
      degreeEducation.status = 1;
    } else if (status === "false") {
      degreeEducation.status = 0;
    }
    dispatch(actions.updateDegreeEducationTypeRequest());
    return updateDegreeEducation(degreeEducation)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateDegreeEducationTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateDegreeEducationTypeSuccess(returnedItem));
        else dispatch(actions.updateDegreeEducationTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateDegreeEducationTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteDegreeEducationOperations = (degreeEducation) => {
  return (dispatch) => {
    dispatch(actions.deleteDegreeEducationTypeRequest());
    return deleteDegreeEducation(degreeEducation)
      .then((returnedItem) => {
        dispatch(actions.deleteDegreeEducationTypeSuccess(degreeEducation));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteDegreeEducationTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const getDegreeEducationOperations = (formData) => {
  return (dispatch) => {
    dispatch(actions.getDegreeEducationTypeRequest());
    return getDegreeEducation(formData)
      .then((returnedItem) => {
        dispatch(actions.getDegreeEducationTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getDegreeEducationTypeFail(e));
        Promise.resolve(e);
      });
  };
};

const resetDegreeEducationOperations = () => {
  return (dispatch) => {
    return dispatch(actions.resetDegreeEducation());
  };
};

export default {
  resetDegreeEducationOperations,
  getDegreeEducationOperations,
  createDegreeEducationOperations,
  deleteDegreeEducationOperations,
  updateDegreeEducationOperations,
};
