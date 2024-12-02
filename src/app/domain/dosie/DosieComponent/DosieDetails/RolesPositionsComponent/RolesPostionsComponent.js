// import React, { useState, useEffect } from "react";
import React, { useState, useEffect} from "react";
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
import AddEditRolesPositionDialog from "./AddEditRolesPositionDialog";
import operations from "./duck/operations";
import RolesPositionsTable from "./RolesPositionsTable";
import AlertDialog from "../../../../../util/alert/AlertDialog";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export default function RolesPositionsComponent(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState();
  const [edit, setEdit] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteDialog, setdeleteDialog] = useState();
  const { rolesPositions } = useSelector((state) => state.dosie);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (props.dosie)
      dispatch(operations.fetchRolesPositionsById(props.dosie.id));
    else {
      !rolesPositions &&
        props.dosie?.id &&
        dispatch(operations.fetchRolesPositionsById(props.dosie.id));
    }
  }, [props.dosie]);

  function openDialog(dialog, row) {
    if (dialog === "add") {
      setAdd(true);
      setSelectedRow(false);
    } else if (dialog === "edit") {
      setEdit(true);
      setSelectedRow(row);
    } else if (dialog === "delete") {
      setdeleteDialog(true);
      setSelectedRow(row);
    }
  }
  function save(item, status) {
    if (item.id)
      dispatch(operations.updateRolesPos(item, status)).then((res) => {
        closeDialog("edit");
      });
    else
      dispatch(operations.createRolesPos(item)).then((res) => {
        closeDialog("add");
      });
  }

  const deleteItem = (item) => {
    dispatch(operations.deleteRolesPos(item.id))
  }

  function closeDialog(dialog) {
    if (dialog === "add") setAdd(false);
    else if (dialog === "edit") setEdit(false);
    else if (dialog === "delete") setdeleteDialog(false);
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">
              <EmojiPeopleIcon
                color={"primary"}
              />{" "}
              <span style={{ fontSize: "20px", color: "#3452b4" }}>
                {translate("app.dosie.rolesPositionInfoForm.title")}
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

      {rolesPositions?.length > 0 && (
        <RolesPositionsTable
          data={rolesPositions}
          onEdit={(item) => {
            openDialog("edit", item);
          }}
          onDelete={(item) => {
            openDialog("delete", item);
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
        />
      )}

      {(rolesPositions === undefined || rolesPositions.length === 0) && (
        <Grid
          style={{ marginTop: "10px", textAlign: "center"}}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px", width: "100%" }}>
              <LayersClearIcon />
              <Typography component="h5" variant="h6" color="inherit" noWrap>
                {translate("app.dosie.rolesPositionInfoForm.noResult")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {add && (
        <AddEditRolesPositionDialog
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
        <AddEditRolesPositionDialog
          id={"rolesPositionInfoFormAddDialog"}
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
          id={"rolesPositionInfoFormsAlertDialog"}
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

      {deleteDialog && (
        <AlertDialog
          id={"DeleteDialog"}
          open={deleteDialog}
          item={deleteDialog}
          onClose={() => setdeleteDialog(false)}
          onCloseYes={() => setdeleteDialog(false)}
          onFunction={() => deleteItem(selectedRow)}
          text={translate("app.notifications.deleteConfirm")}
        />
      )}
    </>
  );
}
