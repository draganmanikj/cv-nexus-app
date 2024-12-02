import actions from "./actions";
import {
  createLanguagesType,
  updateLanguagesType,
  getLanguagesType,
  deleteLanguagesType,
} from "../../../api/languagesTypesApi";

export const createLangType = (languageType) => {
  return (dispatch) => {
    dispatch(actions.createLanguagesTypeRequest());
    return createLanguagesType(languageType)
      .then((returnedItem) => {
        dispatch(actions.createLanguagesTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createLanguagesTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchLanguageTypes = (formData) => {
  return (dispatch) => {
    dispatch(actions.getLanguagesTypesRequest());

    return getLanguagesType(formData)
      .then((returnedItem) => {
        dispatch(actions.getLanguagesTypesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getLanguagesTypesFail(e));
        return Promise.resolve(e);
      });
  };
};

export const updateLangType = (languageType, status) => {
  return (dispatch) => {
    if (status === "true") {
      languageType.status = 1;
    } else if (status === "false") {
      languageType.status = 0;
    }
    dispatch(actions.updateLanguagesTypeRequest());
    return updateLanguagesType(languageType)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateLanguagesTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateLanguagesTypeSuccess(returnedItem));
        else dispatch(actions.updateLanguagesTypeSuccess(languageType));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateLanguagesTypeFail(e));
        return Promise.reject(e);
      });
  };
};
export const deleteLangType = (languageType) => {
  return (dispatch) => {
    dispatch(actions.deleteLanguagesTypeRequest());
    return deleteLanguagesType(languageType)
      .then((returnedItem) => {
        dispatch(actions.deleteLanguagesTypeSuccess(languageType));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteLanguagesTypeFail(e));
        return Promise.reject(e);
      });
  };
};

const resetLanguageType = () => {
  return (dispatch) => {
    return dispatch(actions.resetLanguagesTypes());
  };
};

export default {
  resetLanguageType,
  createLangType,
  fetchLanguageTypes,
  updateLangType,
  deleteLangType,
};
