import {
  getCountry,
  updateCountry,
  deleteCountry,
  createCountry,
} from "../../../api/countryApi.js";
import actions from "./actions";

export const createCountryOperations = (country) => {
  country.status = "1";
  return (dispatch, getState) => {
    dispatch(actions.createCountryTypeRequest());
    return createCountry(country)
      .then((returnedItem) => {
        console.log("returnedItem", returnedItem);
        dispatch(actions.createCountryTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createCountryTypeFail(e));
        return Promise.reject(e);
      });
  };
};
export const getCountryOperations = (formData) => {
  return (dispatch) => {
    dispatch(actions.getCountryTypeRequest());
    return getCountry(formData)
      .then((returnedItem) => {
        dispatch(actions.getCountryTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getCountryTypeFail(e));
        Promise.resolve(e);
      });
  };
};
export const updateCountryOperations = (country, status) => {
  return (dispatch) => {
    if (status === "true") {
      country.status = 1;
    } else if (status === "false") {
      country.status = 0;
    }
    dispatch(actions.updateCountryTypeRequest());
    return updateCountry(country)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateCountryTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateCountryTypeSuccess(returnedItem));
        else dispatch(actions.updateCountryTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateCountryTypeFail(e));
        return Promise.reject(e);
      });
  };
};
export const deleteCountryOperations = (country) => {
  return (dispatch) => {
    dispatch(actions.deleteCountryTypeRequest());
    return deleteCountry(country)
      .then((returnedItem) => {
        dispatch(actions.deleteCountryTypeSuccess(country));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteCountryTypeFail(e));
        return Promise.reject(e);
      });
  };
};
const resetCountryOperations = () => {
  return (dispatch) => {
    return dispatch(actions.resetCountry());
  };
};

export default {
  createCountryOperations,
  deleteCountryOperations,
  getCountryOperations,
  updateCountryOperations,
  resetCountryOperations,
};
