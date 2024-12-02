import actions from "./actions";
import {
  createOutputDocument,
  deleteOutputDocument,
  getOutputDocuments,
  getParametersForSqlOutputDocsApiCall,
  updateOutputDocument,
  getOutputDocType,
} from "../../../api/outputDocumentsPrintApi";

const fetchDocuments = (formData) => {
  return (dispatch) => {
    dispatch(actions.getOutputDocumentsPrintRequest());
    return getOutputDocuments(formData)
      .then((returnedItem) => {
        dispatch(actions.getOutputDocumentsPrintSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getOutputDocumentsPrintFail(e));
        Promise.reject(e);
      });
  };
};

const updateDocument = (item, onClose) => {
  return (dispatch) => {
    dispatch(actions.updateOutputDocumentPrintRequest());
    return updateOutputDocument(item)
      .then((returnedItem) => {
        dispatch(actions.updateOutputDocumentPrintSuccess(returnedItem));
        onClose()
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.updateOutputDocumentPrintFail(e));
        return Promise.reject(e);
      });
  };
};

const saveDocument = (item, onClose) => {
  return (dispatch) => {
    dispatch(actions.createOutputDocumentPrintRequest());
    return createOutputDocument(item)
      .then((returnedItem) => {
        dispatch(actions.createOutputDocumentPrintSuccess(returnedItem));
        onClose()
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.createOutputDocumentPrintFail(e));
        return Promise.reject(e);
      });
  };
};

const deleteDocument = (templateId) => {
  return (dispatch) => {
    dispatch(actions.deleteOutputDocumentPrintRequest());
    return deleteOutputDocument(templateId)
      .then(() => {
        dispatch(actions.deleteOutputDocumentPrintSuccess(templateId));
        return Promise.resolve();
      })
      .catch((e) => {
        dispatch(actions.deleteOutputDocumentPrintFail(e));
        return Promise.reject(e);
      });
  };
};

const getParametersForSql = (templateId) => {
  return (dispatch) => {
    dispatch(actions.getParametersForSqlOutputDocumentPrintRequest());
    return getParametersForSqlOutputDocsApiCall(templateId)
      .then((paramList) => {
        dispatch(actions.getParametersForSqlOutputDocumentPrintSuccess(paramList));
        return Promise.resolve(paramList);
      })
      .catch((e) => {
        dispatch(actions.getParametersForSqlOutputDocumentPrintFail(e));
        return Promise.resolve(e);
      });
  };
};

const updateTemplatePath = (templateId, templatePath, newFile) => {
  return (dispatch) => {
    dispatch(
      actions.updateTemplatePathOutputDocumentsPrint(
        templateId,
        templatePath,
        newFile
      )
    );
  };
};

const resetDocuments = () => {
  return (dispatch) => {
    return dispatch(actions.resetOutputDocumentsPrint());
  };
};

const getDocumentType = () => {
  return (dispatch) => {
    dispatch(actions.getOutputDocumentTypeRequest());
    return getOutputDocType()
      .then((returnedItem) => {
        dispatch(actions.getOutputDocumentTypeSuccess(returnedItem));
        return Promise.resolve(returnedItem);
      })
      .catch((e) => {
        dispatch(actions.getOutputDocumentTypeFail(e));
        return Promise.reject(e);
      });
  };
};

export default {
  fetchDocuments,
  resetDocuments,
  saveDocument,
  updateDocument,
  getParametersForSql,
  updateTemplatePath,
  deleteDocument,
  getDocumentType,
};
