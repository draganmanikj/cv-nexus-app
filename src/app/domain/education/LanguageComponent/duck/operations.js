import actions from "./actions";
import {
  createLanguages,
  updateLanguages,
  getLanguages,
  deleteLanguages,
  getLanguagesById,
} from "../../../../api/languageApi.js";

export const createLanguagesOp = (languagesDetails) => {
  return (dispatch, getState) => {
    dispatch(actions.createLanguagesRequest());
    return createLanguages(languagesDetails)
      .then((returnedItem) => {
        dispatch(actions.createLanguagesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createLanguagesFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchLanguagesOp = (formData) => {
  return (dispatch) => {
    dispatch(actions.getLanguagesRequest());

    return getLanguages(formData)
      .then((returnedItem) => {
        dispatch(actions.getLanguagesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getLanguagesFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchLanguagesById = (id) => {
  return (dispatch) => {
    dispatch(actions.getLanguagesRequest());

    return getLanguagesById(id)
      .then((returnedItem) => {
        dispatch(actions.getLanguagesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getLanguagesFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateLanguagesOp = (languagesDetails) => {
  return (dispatch) => {
    dispatch(actions.updateLanguagesRequest());
    return updateLanguages(languagesDetails)
    .then((returnedItem) => {
        dispatch(actions.updateLanguagesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateLanguagesFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteLanguagesOp = (languagesDetails) => {
  return (dispatch) => {
    dispatch(actions.deleteLanguagesRequest());
    return deleteLanguages(languagesDetails)
      .then((returnedItem) => {
        dispatch(actions.deleteLanguagesSuccess(languagesDetails));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteLanguagesFail(e));
        return Promise.reject(e);
      });
  };
};


const resetLanguagesOp = () => {
  return (dispatch) => {
    return dispatch(actions.resetLanguages());
  };
};

export default {
    resetLanguagesOp,
    createLanguagesOp,
    fetchLanguagesOp,
    updateLanguagesOp,
    deleteLanguagesOp,
    fetchLanguagesById,
};
