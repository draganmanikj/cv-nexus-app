import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import DocumentTypesComponent from "./DocumentTypesComponent";

export default function DocumentTypesContainer(props) {
  const dispatch = useDispatch();
  const { documentTypes, loading } = useSelector((state) => ({
    documentTypes: state.documentTypes.documentTypes,
    loading: state.documentTypes.loading,
  }));

  useEffect(() => {
    return function cleanup() {
      dispatch(operations.resetDocumentType());
    };
  }, []);

  const deleteDocumentType = id => {
    dispatch(operations.deleteDocType(id));
};

  const resetDocumentType = () => {
    dispatch(operations.resetDocumentType());
  };

  return (
    <DocumentTypesComponent
      documentTypes={documentTypes}
      loading={loading}
      resetDocumentType={resetDocumentType}
      deleteDocumentType={deleteDocumentType}
    />
  );
}
