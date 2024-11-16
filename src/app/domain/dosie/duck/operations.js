import actions from "./actions";
import {
  getDosies,
  removeDosie,
  saveDosie,
  editDosie,
  getDosieByUser,
  getFilterUsers,
  getDosiesNotInTypeReqId,
  getDosiesForTypeRequest,
} from "../../../api/dosieApi";

const fetchDosie = () => {
  return (dispatch, getState) => {
    dispatch(actions.getDosiesRequest());
    return getDosies()
      .then((returnedItem) => {
        dispatch(actions.getDosiesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.getDosiesFail(error));
        Promise.resolve(error);
      });
  };
};


const createDosie = (dosie) => {
  return (dispatch) => {
    dispatch(actions.createDosieRequest());
    return saveDosie(dosie)
      .then((returnedItem) => {
        dispatch(actions.createDosieSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.createDosieFail(error));
        return Promise.reject(error);
      });
  };
};

const updateDosie = (dosie) => {
  return (dispatch) => {
    dispatch(actions.updateDosieRequest());
    return editDosie(dosie)
      .then((returnedItem) => {
        dispatch(actions.updateDosieSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.updateDosieFail(error));
        return Promise.reject(error);
      });
  };
};

const deleteDosie = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteDosieRequest());
    return removeDosie(id)
      .then((returnedItem) => {
        dispatch(actions.deleteDosieSuccess(returnedItem)); // message for successful delete from the back
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.deleteDosieFail(error));
        Promise.resolve(error);
      });
  };
};
const sendUserId = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteDosieRequest());
    return removeDosie(id)
      .then((returnedItem) => {
        dispatch(actions.deleteDosieSuccess(returnedItem)); // message for successful delete from the back
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.deleteDosieFail(error));
        Promise.resolve(error);
      });
  };
};

const fetchDosieByUser = (username) => {
  return (dispatch) => {
    dispatch(actions.getDosieByUserRequest());
    return getDosieByUser(username)
      .then((returnedItem) => {
        dispatch(actions.getDosieByUserSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.getDosieByUserFail(error));
        Promise.resolve(error);
      });
  };
};
const fetchFilteredUsers = (formData) => {
  return (dispatch) => {
    dispatch(actions.getFilteredUsersRequest());
    return getFilterUsers(formData)
      .then((returnedItem) => {
        dispatch(actions.getFilteredUsersSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.getFilteredUsersFail(error));
        Promise.reject(error);
      });
  };
};
const fetchDosiesNotInTypeReqId = (typeRequestId) => {
  return (dispatch, getState) => {
    dispatch(actions.getDosiesRequest());
    return getDosiesNotInTypeReqId(typeRequestId)
      .then((returnedItem) => {
        dispatch(actions.getDosiesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.getDosiesFail(error));
        Promise.resolve(error);
      });
  };
};

const fetchDosiesForTypeRequest = (typeRequest) => {
  return (dispatch, getState) => {
    dispatch(actions.getDosiesRequest());
    return getDosiesForTypeRequest(typeRequest)
      .then((returnedItem) => {
        dispatch(actions.getDosiesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((error) => {
        dispatch(actions.getDosiesFail(error));
        Promise.resolve(error);
      });
  };
};
const resetDosie = () => {
  return (dispatch) => {
    return dispatch(actions.resetDosie());
  };
};

export default {
  fetchDosie,
  createDosie,
  updateDosie,
  // deleteDosie,
  fetchDosieByUser,
  resetDosie,
  fetchFilteredUsers,
  fetchDosiesNotInTypeReqId,
  fetchDosiesForTypeRequest,
};
