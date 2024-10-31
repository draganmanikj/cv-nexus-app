import constants from "./constants";

const createTrainingsRequest = (request) => {
    return {
        type: constants.CREATE_TRAININGS_REQUEST,
        payload: request
    };
};
const createTrainingsSuccess = (training) => {    return {
        type: constants.CREATE_TRAININGS_SUCCESS,
        payload: training
    };
};
const createTrainingsFail = (error) => {
    return {
        type: constants.CREATE_TRAININGS_FAIL,
        payload: error
    };
};



const getTrainingsRequest = (request) => {
    return {
        type: constants.GET_TRAININGS_REQUEST,
        payload: request
    };
};
const getTrainingsSuccess = (trainings) => {
    return {
        type: constants.GET_TRAININGS_SUCCESS,
        payload: trainings
    };
};
const getTrainingsFail = (error) => {
    return {
        type: constants.GET_TRAININGS_FAIL,
        payload: error
    };
};




const deleteTrainingsRequest = (request) => {
    return {
        type: constants.DELETE_TRAININGS_REQUEST,
        payload: request
    };
};
const deleteTrainingsSuccess = (training) => {
    return {
        type: constants.DELETE_TRAININGS_SUCCESS,
        payload: training
    };
};
const deleteTrainingsFail = (error) => {
    return {
        type: constants.DELETE_TRAININGS_FAIL,
        payload: error
    };
};




const updateTrainingsRequest = (request) => {
    return {
        type: constants.UPDATE_TRAININGS_REQUEST,
        payload: request
    };
};
const updateTrainingsSuccess = (training) => {
    return {
        type: constants.UPDATE_TRAININGS_SUCCESS,
        payload: training
    };
};
const updateTrainingsFail = (error) => {
    return {
        type: constants.UPDATE_TRAININGS_FAIL,
        payload: error
    };
};

const uploadObukaRequest = (request) => {
    return {
      type: constants.UPLOAD_OBUKA_REQUEST,
      payload: request,
    };
  };
  
  const uploadObukaSuccess = (documentUrl) => {
    return {
      type: constants.UPLOAD_OBUKA_SUCCESS,
      payload: documentUrl,
    };
  };
  
  const uploadObukaFail = (error) => {
    return {
      type: constants.UPLOAD_OBUKA_FAIL,
      payload: error,
    };
  };

  const changeObukaPrintUrlSuccess = (item) => {
    return {
      type: constants.CHANGE_OUTPUT_OBUKA_PRINT_URL_SUCCESS,
      payload: item,
    };
  };
  
  const changeObukaPrintUrlFail = (item) => {
    return {
      type: constants.CHANGE_OUTPUT_OBUKA_PRINT_URL_FAIL,
      payload: item,
    };
  };

  const updateObukaPathOutputDocumentsPrint = (
    obukaId,
    obukaUrl,
    newFile
  ) => {
    return {
      type: constants.OBUKA_UPDATE_FOR_OUTPUT_DOCUMENT_PRINT_STATE_PATH,
      payload: {
        obukaId: obukaId,
        obukaUrl: obukaUrl,
        newFile: newFile,
      },
    };
  };

  const changeCertificatePrintUrlSuccess = (item) => {
    return {
      type: constants.CHANGE_OUTPUT_CERTIFICATE_PRINT_URL_SUCCESS,
      payload: item,
    };
  };
  
  const changeCertificatePrintUrlFail = (item) => {
    return {
      type: constants.CHANGE_OUTPUT_CERTIFICATE_PRINT_URL_FAIL,
      payload: item,
    };
  };

  const updateCertificatePathOutputDocumentsPrint = (
    certificateId,
    certificateUrl,
    newFile
  ) => {
    return {
      type: constants.CERTIFICATE_UPDATE_FOR_OUTPUT_DOCUMENT_PRINT_STATE_PATH,
      payload: {
        obukaId: certificateId,
        obukaUrl: certificateUrl,
        newFile: newFile,
      },
    };
  };
  const downloadObukaRequest = (request) => {
    return {
      type: constants.DOWNLOAD_OBUKA_REQUEST,
      payload: request
    }
  }
  
  const downloadObukaSuccess = (response) => {
    return {
      type: constants.DOWNLOAD_OBUKA_SUCCESS,
      payload: response
    }
  }
  
  const downloadObukaFail = (error) => {
    return {
      type: constants.DOWNLOAD_OBUKA_FAIL,
      payload: error
    }
  }

  const downloadCertificateRequest = (request) => {
    return {
      type: constants.DOWNLOAD_CERTIFICATE_REQUEST,
      payload: request
    }
  }
  
  const downloadCertificateSuccess = (response) => {
    return {
      type: constants.DOWNLOAD_CERTIFICATE_SUCCESS,
      payload: response
    }
  }
  
  const downloadCertificateFail = (error) => {
    return {
      type: constants.DOWNLOAD_CERTIFICATE_FAIL,
      payload: error
    }
  }



const resetTrainings = () => {
    return {
        type: constants.RESET_TRAININGS,
        payload: {}
    };
};

export default {
    createTrainingsRequest,
    createTrainingsSuccess,
    createTrainingsFail,
    getTrainingsRequest,
    getTrainingsSuccess,
    getTrainingsFail,
    deleteTrainingsRequest,
    deleteTrainingsSuccess,
    deleteTrainingsFail,
    updateTrainingsRequest,
    updateTrainingsSuccess,
    updateTrainingsFail,
    uploadObukaRequest,
    uploadObukaSuccess,
    uploadObukaFail,
    downloadObukaRequest,
    downloadObukaSuccess,
    downloadObukaFail,
    downloadCertificateRequest,
    downloadCertificateSuccess,
    downloadCertificateFail,
    updateObukaPathOutputDocumentsPrint,
    changeObukaPrintUrlSuccess,
    changeObukaPrintUrlFail,
    updateCertificatePathOutputDocumentsPrint,
    changeCertificatePrintUrlSuccess,
    changeCertificatePrintUrlFail,
    resetTrainings
};