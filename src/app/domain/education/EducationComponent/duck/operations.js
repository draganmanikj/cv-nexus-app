import actions from "./actions";
import {
  createEducation,
  updateEducation,
  getEducation,
  deleteEducation,
  getEducationsById,
  downloadDiploma,
  downloadUverenie,
  uploadDocument,
} from "../../../../api/educationApi";

export const createEducationOp = (education) => {
  return (dispatch, getState) => {
    dispatch(actions.createEducationRequest());
    return createEducation(education)
      .then((returnedItem) => {
        dispatch(actions.createEducationSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createEducationFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchEducationOp = (formData) => {
  return (dispatch) => {
    dispatch(actions.getEducationRequest());

    return getEducation(formData)
      .then((returnedItem) => {
        dispatch(actions.getEducationSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getEducationFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchEducationById = (id) => {
  return (dispatch) => {
    dispatch(actions.getEducationRequest());

    return getEducationsById(id)
      .then((returnedItem) => {
        dispatch(actions.getEducationSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getEducationFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateEducationOp = (education) => {
  return (dispatch) => {
    dispatch(actions.updateEducationRequest());
    return updateEducation(education)
    .then((returnedItem) => {
        dispatch(actions.updateEducationSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateEducationFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteEducationOp = (education) => {
  return (dispatch) => {
    dispatch(actions.deleteEducationRequest());
    return deleteEducation(education)
      .then((returnedItem) => {
        dispatch(actions.deleteEducationSuccess(education));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteEducationFail(e));
        return Promise.reject(e);
      });
  };
};

const downloadDiplomaEducation = (diplomaId, fileName) => {
  return (dispatch, getState) => {
      return downloadDiploma(diplomaId)
          .then((response) => {
              const downloadUrl = window.URL.createObjectURL(new Blob([response]));
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.setAttribute('download', fileName ? fileName : "test.docx");
              document.body.appendChild(link);
              link.click();
              link.remove();
              return Promise.resolve(response);
          })
          .catch((e) => {
              return Promise.reject(e);
          });
  };
};

const downloadUverenieEducation = (uverenieId, fileName) => {
  return (dispatch, getState) => {
      return downloadUverenie(uverenieId)
          .then((response) => {
              const downloadUrl = window.URL.createObjectURL(new Blob([response]));
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.setAttribute('download', fileName ? fileName : "test.docx");
              document.body.appendChild(link);
              link.click();
              link.remove();
              return Promise.resolve(response);
          })
          .catch((e) => {
              return Promise.reject(e);
          });
  };
};

const uploadDiploma = (documentUrl) => {
  return (dispatch, getState) => {
    dispatch(actions.uploadDiplomaRequest());
    return uploadDocument(documentUrl)
      .then((returnedItem) => {
        dispatch(actions.uploadDiplomaSuccess(documentUrl));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.uploadDiplomaFail(e));
        Promise.reject(e);
      });
  };
};

const uploadUverenie = (documentUrl) => {
  return (dispatch, getState) => {
    dispatch(actions.uploadUverenieRequest());
    return uploadDocument(documentUrl)
      .then((returnedItem) => {
        dispatch(actions.uploadUverenieSuccess(documentUrl));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.uploadUverenieFail(e));
        Promise.reject(e);
      });
  };
};


const resetEducationOp = () => {
  return (dispatch) => {
    return dispatch(actions.resetEducation());
  };
};

export default {
    resetEducationOp,
    createEducationOp,
    fetchEducationOp,
    updateEducationOp,
    deleteEducationOp,
    fetchEducationById,
    downloadDiplomaEducation,
    downloadUverenieEducation,
    uploadDiploma,
    uploadUverenie
};
