import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardComponent from "./DashboardComponent";

export default function DashboardContainer(props) {
  const dispatch = useDispatch();  


  return (
    <DashboardComponent
    />
  );
}
