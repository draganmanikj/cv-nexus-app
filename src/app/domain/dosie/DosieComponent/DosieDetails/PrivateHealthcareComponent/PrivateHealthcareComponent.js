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
import AddEditPrivateHealthcareDialog from "./AddEditPrivateHealthcareDialog";
import operations from "./duck/operations";
import PrivateHealthcareTable from "./PrivateHealthcareTable";
import AlertDialog from "../../../../../util/alert/AlertDialog";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContinuePrivateHealthCareDialog from "./ContinuePrivateHealthCareDialog";

export default function PrivateHealthcareComponent(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState();
  const [edit, setEdit] = useState();
  const [continueDialog, setContinueDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteDialog, setdeleteDialog] = useState();
  const { privateHealthcare } = useSelector((state) => state.dosie);
  const [status, setStatus] = useState();
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const isAdmin = userGroups.includes("admins");

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
    } else if (dialog === "continue") {
      setContinueDialog(true);
      setSelectedRow({});
    } 
  }
  function save(item, status) {
    if (item.id)
      dispatch(operations.updatePrivateHealth(item, status)).then((res) => {
        closeDialog("edit");
      });
    else
      dispatch(operations.createPrivateHealth(item)).then((res) => {
        closeDialog("add");
      });
  }

  const deleteItem = (item) => {
    dispatch(operations.deletePrivateHealth(item.id))
  }

  function continueHealthCare(item) {
    dispatch(operations.continuePrivateHealthCare(item))
      .then(() => {
        closeDialog("continue");
      })
      .catch((e) => {});
  }

  function closeDialog(dialog) {
    if (dialog === "add") setAdd(false);
    else if (dialog === "edit") setEdit(false);
    else if (dialog === "delete") setdeleteDialog(false);
    else if (dialog === "continue") setContinueDialog(false);
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">
              <FavoriteIcon
                color={"primary"}
              />{" "}
              <span style={{ fontSize: "20px", color: "#3452b4" }}>
                {translate("app.dosie.privateHealthcare.title")}
              </span>
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
        {isAdmin && 
        <Grid item >
          <Tooltip title={translate("app.family.buttonContinue.title")}>
            <Button
              size="small"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => openDialog("continue", {})}
            >
              <FavoriteIcon />
              {`${translate("app.family.buttonContinue.title")}`}
            </Button>
          </Tooltip>
        </Grid>
        }
        <Grid item style={{marginLeft:"1rem"}}>
          <Tooltip title={translate("app.generic.add")} >
            <Button
              size="small"
              type="button"
              variant="contained"
              color="primary"
              onClick={() => openDialog("add", {})}
            >
              <AddIcon />
              {translate("app.generic.add")}
            </Button>
          </Tooltip>
        </Grid>
        </Grid>
      </Grid>

      {privateHealthcare?.length > 0 && (
        <PrivateHealthcareTable
          data={privateHealthcare}
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

      {(privateHealthcare === undefined || privateHealthcare.length === 0) && (
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
        <AddEditPrivateHealthcareDialog
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
        <AddEditPrivateHealthcareDialog
          id={"privateHealthcareInfoFormAddDialog"}
          open={edit}
          onClose={() => {
            closeDialog("edit");
          }}
          save={save}
          item={selectedRow}
          dosie={props.dosie}
        />
      )}
      {continueDialog && (
        <ContinuePrivateHealthCareDialog 
              onClose={() => {
                closeDialog("continue");
              }}
              open={continueDialog}
              save={continueHealthCare}
        />
      )
      }
      {openAlertDialog && (
        <AlertDialog
          id={"privateHealthcareInfoFormsAlertDialog"}
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
