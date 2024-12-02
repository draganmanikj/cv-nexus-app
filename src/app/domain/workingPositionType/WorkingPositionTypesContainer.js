import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import WorkingPositionTypesComponent from './WorkingPositionTypesComponent';

export default function WorkingPositionTypesContainer(props) {
  const dispatch = useDispatch();
  const { workingPositionTypes, loading } = useSelector(state => ({
    workingPositionTypes: state.workingPositionTypes.workingPositionTypes,
    loading: state.workingPositionTypes.loading
  }));

  useEffect(() => {
    return function cleanup() {
      dispatch(operations.resetWorkingPosType())
    }
  }, []);

  const deleteWorkingPosition = id => {
    dispatch(operations.deleteWorkingPosType(id));
  };

  const resetWorkingPositions = () => {
    dispatch(operations.resetWorkingPosType())
  }

  return <WorkingPositionTypesComponent
            workingPositionTypes={workingPositionTypes}
            loading={loading}
            resetWorkingPositionTypes={resetWorkingPositions}
            deleteWorkingPosition={deleteWorkingPosition}
          />
}
