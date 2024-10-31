import actions from "./actions";
import {
  createPrivateHealthcare,
  updatePrivateHealthcare,
  getPrivateHealthcare,
  deletePrivateHealthcare,
  getPrivateHealthcareById,
  continueHealthCareApi
} from "../../../../../../api/privateHealthcareApi";

export const createPrivateHealth = (privateHealthcare) => {
  return (dispatch, getState) => {
    dispatch(actions.createPrivateHealthcareRequest());
    return createPrivateHealthcare(privateHealthcare)
      .then((returnedItem) => {
        dispatch(actions.createPrivateHealthcareSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createPrivateHealthcareFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchPrivateHealthcares = (formData) => {
  return (dispatch) => {
    dispatch(actions.getPrivateHealthcaresRequest());

    return getPrivateHealthcare(formData)
      .then((returnedItem) => {
        dispatch(actions.getPrivateHealthcaresSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getPrivateHealthcaresFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchPrivateHealthcaresById = (id) => {
  return (dispatch) => {
    dispatch(actions.getPrivateHealthcaresRequest());

    return getPrivateHealthcareById(id)
      .then((returnedItem) => {
        dispatch(actions.getPrivateHealthcaresSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getPrivateHealthcaresFail(e));
        Promise.resolve(e);
      });
  };
};

export const updatePrivateHealth = (privateHealthcare, status) => {
  return (dispatch) => {
    dispatch(actions.updatePrivateHealthcareRequest());
    return updatePrivateHealthcare(privateHealthcare)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activatePrivateHealthcareSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivatePrivateHealthcareSuccess(returnedItem));
        else dispatch(actions.updatePrivateHealthcareSuccess(privateHealthcare));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updatePrivateHealthcareFail(e));
        return Promise.reject(e);
      });
  };
};
export const deletePrivateHealth = (privateHealthcare) => {
  return (dispatch) => {
    dispatch(actions.deletePrivateHealthcareRequest());
    return deletePrivateHealthcare(privateHealthcare)
      .then((returnedItem) => {
        dispatch(actions.deletePrivateHealthcareSuccess(privateHealthcare));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deletePrivateHealthcareFail(e));
        return Promise.reject(e);
      });
  };
};

export const continuePrivateHealthCare= (healthCare) => {
  return (dispatch, getState) => {
      dispatch(actions.continueHealthCareRequest());
      return continueHealthCareApi(healthCare)
          .then(returnedItem => {
              dispatch(actions.continueHealthCareSuccess(returnedItem));
              return Promise.resolve(returnedItem);
          })
          .catch(e => {
              dispatch(actions.continueHealthCareFail(e));
              return Promise.reject(e);
          });
  };
};
const resetPrivateHealth = () => {
  return (dispatch) => {
    return dispatch(actions.resetPrivateHealthcares());
  };
};

export default {
  resetPrivateHealth,
  createPrivateHealth,
  fetchPrivateHealthcares,
  updatePrivateHealth,
  deletePrivateHealth,
  fetchPrivateHealthcaresById,
  continuePrivateHealthCare
};
