import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import DocumentsComponent from "./DocumentsComponent";

function DocumentsContainer(props) {
  const dispatch = useDispatch();
  const { documents, loading, userDosie } = useSelector((state) => ({
    documents: state?.documents?.documents,
    loading: state?.documents?.loading,
    userDosie: state?.dosie?.userDosie
  }));
  const dosieSelected = props.selectedUser ? props.selectedUser : userDosie;
  useEffect(() => {
    dosieSelected && dispatch(operations.getAllDocumentsByDosie(dosieSelected.id))
  }, [dosieSelected]);

  return <DocumentsComponent documents={documents} loading={loading} dosie={dosieSelected}/>;
}

export default DocumentsContainer;
