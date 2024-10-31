import React, {useState, useEffect } from "react";
import DosieComponent from "./DosieComponent/DosieComponent";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import actions from "./duck/actions";


export default function DosieContainer() {
  const dispatch = useDispatch();
  // dosie - wrapping object -> inside is other dosie object with the actual data
  const { loading, userDosie } = useSelector((state) => ({
    userDosie: state?.dosie?.userDosie,
    loading: state?.dosie?.loading,
  }));
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const adminGroup = "admins";
  const isAdmin = userGroups?.includes(adminGroup);
  const isOwnDosie = window.location.href?.includes("moedosie");
  const isEmployee = window.location.href?.includes("vraboteni");
  const [isDosie, setIsDosie] = useState()

  useEffect(() => {
    if (isEmployee) { // stranica vraboteni
      dispatch(actions.getDosieByUserSuccess());
      dispatch(actions.getFilteredUsersSuccess([]));
    }
  }, [isOwnDosie, isEmployee]);


  const resetDosie = () => {
    dispatch(operations.resetDosie());
  };
  return (
    <DosieComponent
      singleDosie={isAdmin !== true || isOwnDosie} // za vo moedosie
      userDosie={userDosie}
      loading={loading}
      resetReducer={resetDosie}
      isEmployee={isEmployee}
      isDosie={isDosie}
    />
  );
}
