// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import { translate } from "../../../../../util/lang/translate-wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import AddIcon from "@mui/icons-material/Add";
import { WorkOutline } from "@mui/icons-material";
import AddEditWorkingPositionDialog from "./AddEditWorkingPositionDialog";
import operations from "./duck/operations";
import WorkingPositionsTable from "./WorkingPositionsTable";
import AlertDialog from "../../../../../util/alert/AlertDialog";

export default function WorkingPositionsComponent(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState();
  const [edit, setEdit] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { workingPositions } = useSelector((state) => state.dosie);
  const [status, setStatus] = useState();

  // useEffect(() => {
  //   // if (props.dosie)
  //   //   dispatch(operations.fetchWorkingPositionsById(props.dosie.id));

  //     (!workingPositions && props.dosie?.id) &&  dispatch(operations.fetchWorkingPositionsById(props.dosie.id))
  // }, [props.dosie]);

  function openDialog(dialog, row) {
    if (dialog === "add") {
      setAdd(true);
      setSelectedRow(false);
    } else if (dialog === "edit") {
      setEdit(true);
      setSelectedRow(row);
    }
  }
  function save(item, status) {
    if (item.id)
      dispatch(operations.updateWorkingPos(item, status)).then((res) => {
        closeDialog("edit");
      });
    else
      dispatch(operations.createWorkingPos(item)).then((res) => {
        closeDialog("add");
      });
  }

  function closeDialog(dialog) {
    if (dialog === "add") setAdd(false);
    else if (dialog === "edit") setEdit(false);
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">
              <WorkOutline
                color={"primary"}
              />{" "}
              <span style={{ fontSize: "20px", color: "#3452b4" }}>
                {translate("app.dosie.workingPositions.title")}
              </span>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={translate("app.generic.add")} >
            <Button
              size="small"
              type="button"
              variant="contained"
              color="primary"
              marginLeft="auto"
              onClick={() => openDialog("add", {})}
            >
              <AddIcon />
              {translate("app.generic.add")}
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {workingPositions?.length > 0 && (
        <WorkingPositionsTable
          data={workingPositions}
          onEdit={(item) => {
            openDialog("edit", item);
          }}
          onAdd={() => {
            openDialog("add", {});
          }}
          onActivate={(item) => {
            setStatus(1)
            setOpenAlertDialog(item)
          }}
          onDeactivate={(item)=> {
            setStatus(0)
            setOpenAlertDialog(item)
          }}
          onFlag={(item) => {
            save(item)
          }}
        />
      )}

      {(workingPositions === undefined || workingPositions.length === 0) && (
        <Grid
          style={{ marginTop: "10px", textAlign: "center"}}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px", width: "100%" }}>
              <LayersClearIcon />
              <Typography component="h5" variant="h6" color="inherit" noWrap>
                {translate("app.dosie.workingPositions.noResult")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {add && (
        <AddEditWorkingPositionDialog
          open={add}
          onClose={() => {
            closeDialog("add");
          }}
          dosie={props.dosie}
          item={selectedRow}
          save={save}
        />
      )}

      {edit && (
        <AddEditWorkingPositionDialog
          id={"workingPositionAddDialog"}
          open={edit}
          onClose={() => {
            closeDialog("edit");
          }}
          save={save}
          item={selectedRow}
          dosie={props.dosie}
        />
      )}

      {openAlertDialog && (
        <AlertDialog
          id={"workingPositionTypesAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(item) => save(item, status)}
          text={translate(
            `app.notifications.${
              status === 1 ? "activateConfirm" : "deactivateConfirm"
            }`
          )}
          status={status}
        />
      )}
    </>
  );
}
