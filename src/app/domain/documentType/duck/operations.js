import actions from "./actions";
import {
  createDocumentType,
  updateDocumentType,
  getDocumentTypes,
  deleteDocumentType,
} from "../../../api/documentTypesApi";

export const createDocType = (documentType) => {
  return (dispatch, getState) => {
    dispatch(actions.createDocumentTypeRequest());
    return createDocumentType(documentType)
      .then((returnedItem) => {
        dispatch(actions.createDocumentTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createDocumentTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchDocumentTypes = (formData) => {
  return (dispatch) => {
    dispatch(actions.getDocumentTypesRequest());

    return getDocumentTypes(formData)
      .then((returnedItem) => {
        dispatch(actions.getDocumentTypesSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getDocumentTypesFail(e));
        return Promise.resolve(e);
      });
  };
};

// export const updateDocType = (documentType) => {
//   return (dispatch) => {
//     dispatch(actions.updateDocumentTypeRequest());
//     return updateDocumentType(documentType)
//       .then((returnedItem) => {
//         dispatch(actions.updateDocumentTypeSuccess(documentType));
//         return Promise.resolve(returnedItem);
//       })
//       .catch((e) => {
//         dispatch(actions.updateDocumentTypeFail(e));
//         return Promise.reject(e);
//       });
//   };
// };
export const updateDocType = (documentType, status) => {
  return (dispatch) => {
    if (status === "true") {
      documentType.status = 1;
    } else if (status === "false") {
      documentType.status = 0;
    }
    dispatch(actions.updateDocumentTypeRequest());
    return updateDocumentType(documentType)
      .then((returnedItem) => {
        if (status === "true")
          dispatch(actions.activateDocumentTypeSuccess(returnedItem));
        else if (status === "false")
          dispatch(actions.deactivateDocumentTypeSuccess(returnedItem));
        else dispatch(actions.updateDocumentTypeSuccess(documentType));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateDocumentTypeFail(e));
        return Promise.reject(e);
      });
  };
};
export const deleteDocType = (documentType) => {
  return (dispatch) => {
    dispatch(actions.deleteDocumentTypeRequest());
    return deleteDocumentType(documentType)
      .then((returnedItem) => {
        dispatch(actions.deleteDocumentTypeSuccess(documentType));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteDocumentTypeFail(e));
        return Promise.reject(e);
      });
  };
};

const resetDocumentType = () => {
  return (dispatch) => {
    return dispatch(actions.resetDocumentTypes());
  };
};

export default {
  resetDocumentType,
  createDocType,
  fetchDocumentTypes,
  updateDocType,
  deleteDocType,
};
