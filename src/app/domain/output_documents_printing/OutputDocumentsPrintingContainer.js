import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OutputDocumentsPrintingComponent from "./OutputDocumentsPrintingComponent";
import operations from "./duck/operations";

const OutputDocumentsPrintingContainer = () => {
  const dispatch = useDispatch();
  const {outputDocumentsPrint, loading} = useSelector(state => ({
    outputDocumentsPrint: state.outputDocumentsPrint.outputDocumentsPrint,
    loading: state.outputDocumentsPrint.loading,
  }));

  const fetchDocuments = formData => {
    dispatch(operations.fetchDocuments(formData));
  };
  const resetDocuments = () => {
    dispatch(operations.resetDocuments());
  };
  const updateDocument = (doc, onClose) => {
    dispatch(operations.updateDocument(doc, onClose));
  };
  const saveDocument = (doc, onClose) => {
    dispatch(operations.saveDocument(doc, onClose));
  };
  const deleteDocument = docId => {
    dispatch(operations.deleteDocument(docId));
  };

  return (
    <OutputDocumentsPrintingComponent
      fetchDocuments={fetchDocuments}
      resetDocuments={resetDocuments}
      updateDocument={updateDocument}
      saveDocument={saveDocument}
      deleteDocument={deleteDocument}
      documents={outputDocumentsPrint}
      loading={loading}
    />
  );
};

export default OutputDocumentsPrintingContainer;
