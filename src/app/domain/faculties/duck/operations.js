import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../../../api/facultyApi.js";
import actions from "./actions";

export const createFacultyOperations = (faculty) => {
  faculty.status = "1";
  return (dispatch, getState) => {
    dispatch(actions.createFacultyTypeRequest());
    return createFaculty(faculty)
      .then((returnedItem) => {
        console.log("returnedItem", returnedItem);
        dispatch(actions.createFacultyTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createFacultyTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const getFacultyOperations = (formData) => {
  return (dispatch) => {
    dispatch(actions.getFacultyTypeRequest());
    return getFaculty(formData)
      .then((returnedItem) => {
        dispatch(actions.getFacultyTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getFacultyTypeFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateFacultyOperations = (faculty, status) => {
  return (dispatch) => {
    if (status === "true") {
      faculty.status = 1;
    } else if (status === "false") {
      faculty.status = 0;
    }
    dispatch(actions.updateFacultyTypeRequest());
    return updateFaculty(faculty)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateFacultyTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateFacultyTypeSuccess(returnedItem));
        else dispatch(actions.updateFacultyTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateFacultyTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteFacultyOperations = (faculty) => {
  return (dispatch) => {
    dispatch(actions.deleteFacultyTypeRequest());
    return deleteFaculty(faculty)
      .then((returnedItem) => {
        dispatch(actions.deleteFacultyTypeSuccess(faculty));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteFacultyTypeFail(e));
        return Promise.reject(e);
      });
  };
};

const resetFacultyOperations = () => {
  return (dispatch) => {
    return dispatch(actions.resetFaculty());
  };
};

export default {
  getFacultyOperations,
  updateFacultyOperations,
  createFacultyOperations,
  deleteFacultyOperations,
  resetFacultyOperations,
};
