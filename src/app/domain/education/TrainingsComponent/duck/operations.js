import actions from "./actions";
import {
  createTrainings,
  updateTrainings,
  getTrainings,
  deleteTrainings,
  getTrainingsById,
  downloadObuka,
  downloadCertificate,
} from "../../../../api/trainingsApi";

export const createTrainingsOp = (education) => {
  return (dispatch, getState) => {
    dispatch(actions.createTrainingsRequest());
    return createTrainings(education)
      .then((returnedItem) => {
        dispatch(actions.createTrainingsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createTrainingsFail(e));
        return Promise.reject(e);
      });
  };
};

export const fetchTrainingsOp = (formData) => {
  return (dispatch) => {
    dispatch(actions.getTrainingsRequest());

    return getTrainings(formData)
      .then((returnedItem) => {
        dispatch(actions.getTrainingsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getTrainingsFail(e));
        Promise.resolve(e);
      });
  };
};
export const fetchTrainingsById = (id) => {
  return (dispatch) => {
    dispatch(actions.getTrainingsRequest());

    return getTrainingsById(id)
      .then((returnedItem) => {
        dispatch(actions.getTrainingsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getTrainingsFail(e));
        Promise.resolve(e);
      });
  };
};

export const updateTrainingsOp = (education) => {
  return (dispatch) => {
    dispatch(actions.updateTrainingsRequest());
    return updateTrainings(education)
    .then((returnedItem) => {
        dispatch(actions.updateTrainingsSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateTrainingsFail(e));
        return Promise.reject(e);
      });
  };
};

export const deleteTrainingsOp = (education) => {
  return (dispatch) => {
    dispatch(actions.deleteTrainingsRequest());
    return deleteTrainings(education)
      .then((returnedItem) => {
        dispatch(actions.deleteTrainingsSuccess(education));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.deleteTrainingsFail(e));
        return Promise.reject(e);
      });
  };
};

const updateObukaPath = (obukaId, obukaUrl, newFile) => {
  return (dispatch) => {
    dispatch(
      actions.updateObukaPathOutputDocumentsPrint(
        obukaId,
        obukaUrl,
        newFile
      )
    );
  };
};

const updateCertificatePath = (certificateId, certificateUrl, newFile) => {
  return (dispatch) => {
    dispatch(
      actions.updateCertificatePathOutputDocumentsPrint(
        certificateId,
        certificateUrl,
        newFile
      )
    );
  };
};

const resetTrainingsOp = () => {
  return (dispatch) => {
    return dispatch(actions.resetTrainings());
  };
};


const downloadObukaTrainings = (obukaId, fileName) => {
  return (dispatch, getState) => {
      return downloadObuka(obukaId)
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

const downloadCertificateTrainings = (certificateId, fileName) => {
  return (dispatch, getState) => {
      return downloadCertificate(certificateId)
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

export default {
    resetTrainingsOp,
    createTrainingsOp,
    fetchTrainingsOp,
    updateTrainingsOp,
    deleteTrainingsOp,
    fetchTrainingsById,
    downloadObukaTrainings,
    downloadCertificateTrainings,
    updateObukaPath,
    updateCertificatePath,
};
