import constants from "./constants";

const createEducationRequest = (request) => {
    return {
        type: constants.CREATE_EDUCATION_REQUEST,
        payload: request
    };
};
const createEducationSuccess = (education) => {    return {
        type: constants.CREATE_EDUCATION_SUCCESS,
        payload: education
    };
};
const createEducationFail = (error) => {
    return {
        type: constants.CREATE_EDUCATION_FAIL,
        payload: error
    };
};



const getEducationRequest = (request) => {
    return {
        type: constants.GET_EDUCATION_REQUEST,
        payload: request
    };
};
const getEducationSuccess = (educations) => {
    return {
        type: constants.GET_EDUCATION_SUCCESS,
        payload: educations
    };
};
const getEducationFail = (error) => {
    return {
        type: constants.GET_EDUCATION_FAIL,
        payload: error
    };
};




const deleteEducationRequest = (request) => {
    return {
        type: constants.DELETE_EDUCATION_REQUEST,
        payload: request
    };
};
const deleteEducationSuccess = (education) => {
    return {
        type: constants.DELETE_EDUCATION_SUCCESS,
        payload: education
    };
};
const deleteEducationFail = (error) => {
    return {
        type: constants.DELETE_EDUCATION_FAIL,
        payload: error
    };
};




const updateEducationRequest = (request) => {
    return {
        type: constants.UPDATE_EDUCATION_REQUEST,
        payload: request
    };
};
const updateEducationSuccess = (education) => {
    return {
        type: constants.UPDATE_EDUCATION_SUCCESS,
        payload: education
    };
};
const updateEducationFail = (error) => {
    return {
        type: constants.UPDATE_EDUCATION_FAIL,
        payload: error
    };
};

const uploadDiplomaRequest = (request) => {
    return {
      type: constants.UPLOAD_DIPLOMA_REQUEST,
      payload: request,
    };
  };
  
  const uploadDiplomaSuccess = (documentUrl) => {
    return {
      type: constants.UPLOAD_DIPLOMA_SUCCESS,
      payload: documentUrl,
    };
  };
  
  const uploadDiplomaFail = (error) => {
    return {
      type: constants.UPLOAD_DIPLOMA_FAIL,
      payload: error,
    };
  };

  const uploadUverenieRequest = (request) => {
    return {
      type: constants.UPLOAD_UVERENIE_REQUEST,
      payload: request,
    };
  };
  
  const uploadUverenieSuccess = (documentUrl) => {
    return {
      type: constants.UPLOAD_UVERENIE_SUCCESS,
      payload: documentUrl,
    };
  };
  
  const uploadUverenieFail = (error) => {
    return {
      type: constants.UPLOAD_UVERENIE_FAIL,
      payload: error,
    };
  };
  
  const downloadDiplomaRequest = (request) => {
    return {
      type: constants.DOWNLOAD_DIPLOMA_REQUEST,
      payload: request
    }
  }
  
  const downloadDiplomaSuccess = (response) => {
    return {
      type: constants.DOWNLOAD_DIPLOMA_SUCCESS,
      payload: response
    }
  }
  
  const downloadDiplomaFail = (error) => {
    return {
      type: constants.DOWNLOAD_DIPLOMA_FAIL,
      payload: error
    }
  }

  const downloadUverenieRequest = (request) => {
    return {
      type: constants.DOWNLOAD_UVERENIE_REQUEST,
      payload: request
    }
  }
  
  const downloadUverenieSuccess = (response) => {
    return {
      type: constants.DOWNLOAD_UVERENIE_SUCCESS,
      payload: response
    }
  }
  
  const downloadUverenieFail = (error) => {
    return {
      type: constants.DOWNLOAD_UVERENIE_FAIL,
      payload: error
    }
  }
const resetEducation = () => {
    return {
        type: constants.RESET_EDUCATIONS,
        payload: {}
    };
};

export default {
    createEducationRequest,
    createEducationSuccess,
    createEducationFail,
    getEducationRequest,
    getEducationSuccess,
    getEducationFail,
    deleteEducationRequest,
    deleteEducationSuccess,
    deleteEducationFail,
    updateEducationRequest,
    updateEducationSuccess,
    updateEducationFail,
    uploadDiplomaRequest,
    uploadDiplomaSuccess,
    uploadDiplomaFail,
    uploadUverenieRequest,
    uploadUverenieSuccess,
    uploadUverenieFail,
    downloadDiplomaRequest,
    downloadDiplomaSuccess,
    downloadDiplomaFail,
    downloadUverenieRequest,
    downloadUverenieSuccess,
    downloadUverenieFail,
    resetEducation
};