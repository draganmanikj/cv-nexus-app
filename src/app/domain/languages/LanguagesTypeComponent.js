import React, { useState } from "react";
import { FTextField } from "asseco-commons";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import { translate } from "../../util/lang/translate-wrapper";
import { Field, Form, Formik } from "formik";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import { FDatePicker } from "asseco-commons";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import LockScreenDialog from "../../util/lock/LockScreenDialog";
import AddIcon from "@mui/icons-material/Add";
import LanguagesAddDialog from "./LanguagesTypeAddDialog"
import LanguageTypeTable from "./LanguageTypeTable";
import AlertDialog from "../../util/alert/AlertDialog";
import LanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles ({
  root: {
    "& .MuiCardHeader-root": {
      padding: "1rem 1rem 0 1rem !important",
      "& .MuiGrid-container": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiCardActions-root": {
          display: "flex",
        },
      },
    },
  },
  mlauto:{
    marginLeft: "auto"
  },
  gridMain: {
    marginLeft:"2rem",
  },
  flexEnd:{
    justifyContent:"flex-end"
  }
})

export default function LanguagesComponent(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();

  const [selectedRow, setSelectedRow] = useState(undefined);
  const [rerenderApp, setRerenderApp] = useState(true);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [status, setStatus] = useState(undefined);


  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteDialog, setdeleteDialog] = useState();

  const languagesTypes = useSelector( (state) => state.languagesTypes.languagesTypes )

  const username = useSelector(
    (state) => state.oidc.user?.profile.preferred_username
  );

  const initialValues = {};

  const resetForm = () => {
    setRerenderApp(!rerenderApp);
    dispatch(operations.resetLanguageType());
  };

  const searchLanguagesTypes = (formData) => {
    dispatch(operations.fetchLanguageTypes(formData));
  };

  function openDialog(action, row) {
    if (action === "add") {
      setOpen(true);
      setSelectedRow({});
    } 
     else if (action === "edit") {
      setEdit(true);
      setSelectedRow(row);
    }
    else if (action === "deleteDialog") {
      setdeleteDialog(true);
      setSelectedRow(row);
    }
  }

  function closeDialog(action) {
    if (action === "add") setOpen(false);
    else if (action === "edit") setEdit(false);
    else if (action === "deleteDialog") setdeleteDialog(false);
  }

  const save = (language) => {
    if(language.id)
    {
      dispatch(operations.updateLangType(language, status))
      .then(() => {
        closeDialog("edit");
      })
    }
    else{
      dispatch(operations.createLangType(language))
        .then(() => {
          closeDialog("add");
        })
    }
  };

  function deleteRow(row) {
    dispatch(operations.deleteLangType(row.id));
  }

  return (
    <>
      <Grid style={{ marginBottom: "15px" }} item xs={12}>
        {" "}
        <LanguageIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
        <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
          {translate("app.drawer.languages")}
        </span>
      </Grid>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            isInitialValid={true}
            onSubmit={(values, actions) => {
              searchLanguagesTypes(values).then(() => {
                actions.setSubmitting(false);
              });
            }}
            key={rerenderApp}
            render={(formikProps) => (
              <Form autoComplete="off" id="workPosTypesSearchForm" style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                <Card className={classes.root}>
                  <CardHeader
                    title={
                      <Grid container justifyContent="space-between">
                        <Grid item xs={6}>
                          <Typography variant="h6">
                            {translate(
                              "app.languagesTypes.formularPrebarajHeader"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                  <CardContent>
                      <Grid container spacing={2} key={rerenderApp} style={{alignItems:"center"}}>
                            <Grid item xs={2}>
                              <Field
                                name="language"
                                label={translate(
                                  "app.languagesTypes.language"
                                )}
                                component={FTextField}
                                margin="none"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Field
                                name="createdBy"
                                label={translate(
                                  "app.documentTypes.table.createdBy"
                                )}
                                component={FTextField}
                                margin="none"
                              />
                            </Grid>
                                <Grid
                                  item
                                  xs={2}
                                >
                                  <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                  <Field
                                    name="dateCreated"
                                    label={translate(
                                      "app.groups.table.dateCreated"
                                    )}
                                    component={FDatePicker}
                                    format={"DD.MM.YYYY"}
                                    margin="none"
                                  />
                                  </div>
                                </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions style={{position: "absolute"}}>
                    <Tooltip title={translate("app.generic.add")}>
                      <span>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            openDialog("add", {});
                          }}
                        >
                          <AddIcon />
                          {translate("app.illnessRequestTypes.dodadiButton")}
                        </Button>
                      </span>
                    </Tooltip>
                  </CardActions>
                  <CardActions className={classes.flexEnd} >
                    <span>
                      <Button
                        size="small"
                        color="primary"
                        type="submit"
                        variant="outlined"
                      >
                        <SearchIcon />
                        {translate("app.documentTypes.search")}
                      </Button>
                    </span>
                    <Tooltip
                      title={translate("app.illnessRequestTypes.iscistiFiltri")}
                    >
                      <span>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          color={"secondary"}
                          onClick={resetForm}
                        >
                          <ClearAllIcon />
                          {translate(
                            "app.illnessRequestTypes.iscistiFiltriButton"
                          )}
                        </Button>
                      </span>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Form>
            )}
          />
      <br />

      <LockScreenDialog
        open={props.loading}
        id={"documentTypesLockScreenDialog"}
      />

      {languagesTypes !== undefined &&
        languagesTypes?.length !== 0 && (
          <Grid  style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
            <LanguageTypeTable
              data={languagesTypes}
              onAdd={() => {
                openDialog("add");
              }}
              onEdit={(row) => {
                openDialog("edit", row);
              }}
              onDelete={(row) => {
                openDialog("deleteDialog", row);
              }}
              onActivate={(row) => {
                setStatus("true");
                setOpenAlertDialog(row);
              }}
              onDeactivate={(row) => {
                setStatus("false");
                setOpenAlertDialog(row);
              }}
              exportFileName={username}
            />
          </Grid>
        )}

      {languagesTypes !== undefined &&
       languagesTypes?.length === 0 && (
          <Grid
            style={{ marginTop: "10px", textAlign: "center" }}
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Paper
                style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px" }}
              >
                <LayersClearIcon />
                <Typography component="h5" variant="h6" color=" inherit" noWrap>
                  {translate("app.applications.noResult")}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

      {open && (
        <LanguagesAddDialog
          id={"add"}
          onClose={() => {
            closeDialog("add");
          }}
          open={open}
          save={save}
          item={selectedRow}
        />
      )}

      {edit && (
        <LanguagesAddDialog
          id={"edit"}
          open={edit}
          onClose={() => {
            closeDialog("edit");
          }}
          save={save}
          item={selectedRow}
        />
      )}

      {deleteDialog && (
        <AlertDialog
          id={"languagesTypesDeleteDialog"}
          open={deleteDialog}
          item={deleteDialog}
          onClose={() => setdeleteDialog(false)}
          onCloseYes={() => setdeleteDialog(false)}
          onFunction={() => deleteRow(selectedRow)}
          text={translate("app.notifications.deleteConfirm")}
        />
      )}

      {openAlertDialog && (
        <AlertDialog
          id={"languagesTypesAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(item) => save(item, status)}
          text={translate(
            `app.notifications.${
              status === "true" ? "activateConfirm" : "deactivateConfirm"
            }`
          )}
          status={status}
        />
      )}
    </>
  );
}
