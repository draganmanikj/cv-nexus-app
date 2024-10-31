import React, { useEffect, useState } from "react";
import {
  AssecoDataTable,
} from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import operations from "./duck/operations";
import docTypeOperations from "../documentType/duck/operations";
import { useDispatch, useSelector } from "react-redux";
import DocumentAddDialog from "./DocumentAddDialog";
import AlertDialog from "../../util/alert/AlertDialog";
import {
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
  Tooltip,
  Card
} from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import LockScreenDialog from "../../util/lock/LockScreenDialog";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function DocumentsComponent(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState();
  const [edit, setEdit] = useState();
  const [deleteDialog, setdeleteDialog] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const documentTypes = useSelector(
    (state) => state.documentTypes.documentTypes
  );
  const username = useSelector(
    (state) => state.oidc.user?.profile.preferred_username
  );
  
  const initalValues = props.documents && props.documents.map(item => {
    const documentUrl = item?.documentUrl;
    const documentName = documentUrl 
    ? documentUrl.substring(0, documentUrl.indexOf('-')) + documentUrl.slice(documentUrl.lastIndexOf('.'))
    : undefined;
  return {
    ...item,
    documentName: documentName
  };
  })
  useEffect(() => {
    dispatch(docTypeOperations.fetchDocumentTypes())
      .then(() => {})
      .catch((e) => {});
  }, []);

  function openDialog(dialog, row) {
    if (dialog === "add") {
      setAdd(true);
      setSelectedRow(false);
    } else if (dialog === "edit") {
      setEdit(true);
      setSelectedRow(row);
    } else if (dialog === "deleteDialog") {
      setdeleteDialog(true);
      setSelectedRow(row);
    }
  }
  function save(item) {
    if (item.id)
      dispatch(operations.updateSelectedDocument(item)).then((res) => {
        closeDialog("edit");
      });
    else
      dispatch(operations.createItem(item)).then((res) => {
        closeDialog("add");
      });
  }

  const deleteMessage = (item) => {
    dispatch(operations.deleteSelectedDocument(item))
  }
  function closeDialog(dialog) {
    if (dialog === "add") setAdd(false);
    else if (dialog === "edit") setEdit(false);
    else if (dialog === "deleteDialog") setdeleteDialog(false);
  }

  return (
    <>
    <Card style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
      <CardHeader
        title={
          <Grid style={{ marginBottom: "15px" }} item xs={12}>
            {" "}
            <AssignmentIndIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
            <span style={{ fontSize: "25px", color: "#3452b4" }}>
              {" "}
              {translate("app.documents.formularPrebarajHeader")}
            </span>
          </Grid>
        }
        
      />
      <LockScreenDialog open={props.loading} id={"rolesLockScreenDialog"} />
        <CardActions style={{justifyContent: "flex-end", marginRight:"0.5rem"}}>
            <Tooltip title={translate("app.generic.add")} >
                  <Button
                    size="small"
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => openDialog("add")}
                  >
                    <AddIcon />
                    {translate("app.generic.add")}
                  </Button>
            </Tooltip>
        </CardActions>
        <CardContent>
      {props.documents !== undefined && props.documents.length !== 0 && (
        <form autocomplete="off" >
          <AssecoDataTable
            id={"documentTypesSearchResultTable"}
            filtering
            paging
            columnResizing
            type={"devExtreme"}
            data={initalValues}
            columns={[
              {
                name: "docType.docType",
                label: translate(`app.documentTypes.table.name`),
              },
              {
                name: "documentName",
                label: translate(`app.documents.form.documentName`),
              },
              {
                name: "description",
                label: translate(`app.documents.form.description`),
              },
              {
                name: "status",
                label: translate(`app.documents.form.status`),
              },
              {
                name: "version",
                label: translate(`app.documents.form.version`),
              },
              {
                name: "createdBy",
                label: translate(`app.documentTypes.table.createdBy`),
              },
            ]}
            hiddenColumns={["status","version"]}
            onEdit={(row) => {
              openDialog("edit", row);
            }}
            onAdd={() => {
              openDialog("add", {});
            }}
            onDelete={(row) => {
              openDialog("deleteDialog", row);
            }}
            export={true}
            exportFileName={username}
            sorting
          />
        </form>
      )}
        </CardContent>
      </Card>
      {props.documents !== undefined && props.documents.length === 0 && (
        <Grid
          style={{ marginTop: "10px", textAlign: "center" }}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px" }}>
              <LayersClearIcon />
              <Typography component="h5" variant="h6" color=" inherit" noWrap>
                {translate("app.roles.noResult")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      {add && (
        <DocumentAddDialog
          open={add}
          item={selectedRow}
          onClose={() => {
            closeDialog("add");
          }}
          dosie={props.dosie}
          documentTypes={documentTypes}
          save={save}
        />
      )}
      {edit && (
        <DocumentAddDialog
          open={edit}
          item={selectedRow}
          onClose={() => {
            closeDialog("edit");
          }}
          dosie={props.dosie}
          documentTypes={documentTypes}
          save={save}
        />
      )}
      {deleteDialog && (
        <AlertDialog
          id={"educationDeleteDialog"}
          open={deleteDialog}
          item={deleteDialog}
          onClose={() => setdeleteDialog(false)}
          onCloseYes={() => setdeleteDialog(false)}
          onFunction={() => deleteMessage(selectedRow)}
          text={translate("app.notifications.deleteConfirm")}
        />
      )}
      {openAlertDialog && (
        <AlertDialog
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(item) => save(item)}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </>
  );
}

export default DocumentsComponent;
