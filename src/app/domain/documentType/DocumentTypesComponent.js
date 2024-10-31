import React, { useState } from "react";
import { AssecoDataTable, FTextField } from "asseco-commons";
import { useDispatch, useSelector } from "react-redux";
import operations from "./duck/operations";
import { translate } from "../../util/lang/translate-wrapper";
import AppsIcon from "@mui/icons-material/Apps";
import { Field, Form, Formik } from "formik";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import { FDatePicker } from "asseco-commons";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TodayIcon from "@mui/icons-material/Today";
import * as Yup from "yup";
import LockScreenDialog from "../../util/lock/LockScreenDialog";
import { renderDateCustomCell } from "../../util/helper/generalHelpers";
import AddIcon from "@mui/icons-material/Add";
import DocumentTypesAddDialog from "./DocumentTypesAddDialog";
import DocumentTypesTable from "./DocumentTypesTable";
import AlertDialog from "../../util/alert/AlertDialog";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

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
  flexGridItm: {
    display: "flex !important",
    alignItems: "flex-end !important",
  },
  mb025rem: {
    marginBottom: "0.25rem",
  },
  mb05rem: {
    marginBottom: "0.5rem",
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

export default function DocumentTypesComponent(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();

  const [selectedRow, setSelectedRow] = useState(undefined);
  const [rerenderApp, setRerenderApp] = React.useState(true);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [status, setStatus] = useState(undefined);
  const [dateCreatedBoundaries, setDateCreatedBoundaries] = useState(false);
  const [dateModifiedBoundaries, setDateModifiedBoundaries] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const username = useSelector(
    (state) => state.oidc.user?.profile.preferred_username
  );

  const initialValues = {};

  const resetForm = () => {
    setRerenderApp(!rerenderApp);
    props.resetDocumentType();
  };

  const searchDocumentTypes = (formData) => {
    dispatch(operations.fetchDocumentTypes(formData));
  };

  function openDialog(action, row) {
    if (action === "add") {
      setOpen(true);
      setSelectedRow({});
    } else if (action === "view") {
      setView(true);
      setSelectedRow(row);
    } else if (action === "edit") {
      setEdit(true);
      setSelectedRow(row);
    }
  }

  function closeDialog(action) {
    if (action === "add") setOpen(false);
    else if (action === "view") setView(false);
    else if (action === "edit") setEdit(false);
  }

  const save = (docType) => {
    docType.status = 1;
    dispatch(operations.createDocType(docType))
      .then(() => {
        closeDialog("add");
      })
      .catch((e) => {});
  };

  const update = (docType, status) => {
    dispatch(operations.updateDocType(docType, status))
      .then(() => {
        closeDialog("edit");
      })
      .catch((e) => {});
  };

  function deleteRow(id) {
    // dispatch(operations.deleteSelectedRole(id));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(120, translate("app.notifications.maxLength120"))
      .nullable(),
    longName: Yup.string()
      .max(120, translate("app.notifications.maxLength120"))
      .nullable(),
    description: Yup.string()
      .max(240, translate("app.notifications.maxLength240"))
      .nullable(),
    createdBy: Yup.string()
      .max(120, translate("app.notifications.maxLength120"))
      .nullable(),
    modifiedBy: Yup.string()
      .max(120, translate("app.notifications.maxLength120"))
      .nullable(),
    dateCreated: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
    dateCreated_from: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
    dateCreated_to: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
    dateModified: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
    dateModified_from: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
    dateModified_to: Yup.date()
      .typeError(translate("app.notifications.ErrorDate"))
      .nullable(),
  });

  return (
    <>
      <Grid style={{ marginBottom: "15px" }} item xs={12}>
        {" "}
        <AppsIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
        <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
          {translate("app.drawer.documentTypes")}
        </span>
      </Grid>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            isInitialValid={true}            
            // validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              searchDocumentTypes(values).then(() => {
                actions.setSubmitting(false);
              });
            }}
            key={rerenderApp}
            render={(formikProps) => (
              <Form autoComplete="off" id="workPosTypesSearchForm">
                <Card className={classes.root} style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                  <CardHeader
                    title={
                      <Grid container justifyContent="space-between">
                        <Grid item xs={6}>
                          <Typography variant="h6">
                            {translate(
                              "app.documentTypes.formularPrebarajHeader"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                  <CardContent>
                      <Grid container spacing={1} key={rerenderApp}>
                            <Grid item xs={3}>
                              <Field
                                name="docType"
                                label={translate(
                                  "app.documentTypes.table.name"
                                )}
                                component={FTextField}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Field
                                name="createdBy"
                                label={translate(
                                  "app.documentTypes.table.createdBy"
                                )}
                                component={FTextField}
                              />
                            </Grid>
                            {dateCreatedBoundaries === false ? (
                              <>
                                <Grid
                                  item
                                  xs={2}
                                  className={`${classes.flexGridItm} ${classes.mb025rem} `}
                                >
                                  <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                    <Field
                                      name="dateCreated"
                                      label={translate(
                                        "app.groups.table.dateCreated"
                                      )}
                                      component={FDatePicker}
                                      format={"DD.MM.YYYY"}
                                    />
                                  </div>
                                </Grid>
                                <Grid item xs={1} className={`${classes.flexGridItm} ${classes.mb025rem} `}>
                                  <Tooltip
                                    title={translate(
                                      "app.groups.swapToBoundaries"
                                    )}
                                  >
                                    <IconButton
                                      style={{
                                        color: "white",
                                        backgroundColor: "#3f51b5",
                                      }}
                                      onClick={() => {
                                        formikProps.setFieldValue(
                                          "dateCreated",
                                          null
                                        );
                                        formikProps.setFieldValue(
                                          "dateCreated_from",
                                          null
                                        );
                                        formikProps.setFieldValue(
                                          "dateCreated_to",
                                          null
                                        );
                                        setDateCreatedBoundaries(
                                          !dateCreatedBoundaries
                                        );
                                      }}
                                      aria-label="Close"
                                    >
                                      <DateRangeIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid
                                  item
                                  xs={2}
                                  className={`${classes.flexGridItm} ${classes.mb025rem} `}
                                >
                                  <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                    <Field
                                      name="dateCreated_from"
                                      label={translate(
                                        "app.groups.table.dateCreatedFrom"
                                      )}
                                      component={FDatePicker}
                                      format={"DD.MM.YYYY"}
                                      onChange={(value) => {
                                        formikProps.setFieldValue(
                                          "dateCreated_from",
                                          value
                                        );
                                        if (
                                          formikProps.values.dateCreated_to ===
                                            undefined ||
                                          formikProps.values.dateCreated_to ===
                                            null ||
                                          value === null
                                        ) {
                                          formikProps.setFieldValue(
                                            "dateCreated_to",
                                            value
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  className={`${classes.flexGridItm} ${classes.mb025rem} `}
                                >
                                  <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                    <Field
                                      name="dateCreated_to"
                                      label={translate(
                                        "app.groups.table.dateCreatedTo"
                                      )}
                                      component={FDatePicker}
                                      format={"DD.MM.YYYY"}
                                      onChange={(value) => {
                                        formikProps.setFieldValue(
                                          "dateCreated_to",
                                          value
                                        );
                                        if (
                                          formikProps.values.dateCreated_from ===
                                            undefined ||
                                          formikProps.values.dateCreated_from ===
                                            null ||
                                          value === null
                                        ) {
                                          formikProps.setFieldValue(
                                            "dateCreated_from",
                                            value
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item xs={1} className={`${classes.flexGridItm} ${classes.mb025rem} `}>
                                  <Tooltip
                                    title={translate("app.groups.swapToExact")}
                                  >
                                    <IconButton
                                      style={{
                                        color: "white",
                                        backgroundColor: "#3f51b5",
                                      }}
                                      onClick={() => {
                                        formikProps.setFieldValue(
                                          "dateCreated",
                                          null
                                        );
                                        formikProps.setFieldValue(
                                          "dateCreated_from",
                                          null
                                        );
                                        formikProps.setFieldValue(
                                          "dateCreated_to",
                                          null
                                        );
                                        setDateCreatedBoundaries(
                                          !dateCreatedBoundaries
                                        );
                                      }}
                                      aria-label="Close"
                                    >
                                      <TodayIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </>
                            )}
                    </Grid>
                  </CardContent>
                  <CardActions style={{position: "absolute"}}>
                  <Tooltip title={translate("app.roles.dodadi")}>
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
                        disabled={!formikProps.isValid}
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

      {props.documentTypes !== undefined &&
        props.documentTypes.length !== 0 && (
          <Grid style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
            <DocumentTypesTable
              data={props.documentTypes}
              onAdd={() => {
                openDialog("add");
              }}
              onEdit={(row) => {
                openDialog("edit", row);
              }}
              onDelete={(row) => {
                props.deleteDocumentType(row.id);
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

      {props.documentTypes !== undefined &&
        props.documentTypes.length === 0 && (
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
        <DocumentTypesAddDialog
          id={"documentTypesAddDialog"}
          onClose={() => {
            closeDialog("add");
          }}
          open={open}
          save={save}
          item={selectedRow}
        />
      )}

      {edit && (
        <DocumentTypesAddDialog
          id={"documentTypesAddDialog"}
          open={edit}
          onClose={() => {
            closeDialog("edit");
          }}
          save={update}
          item={selectedRow}
        />
      )}

      {openAlertDialog && (
        <AlertDialog
          id={"documentTypesAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(item) => update(item, status)}
          text={translate(
            `app.notifications.${
              status === "true" ? "activateConfirm" : "deactivateConfirm"
            }`
          )}
          status={status}
        />
      )}

      {/*<ApplicationsEditDialog*/}
      {/*  id={"applicationsEditDialog"}*/}
      {/*  open={selectedApp}*/}
      {/*  onClose={() => setSelectedApp(undefined)}*/}
      {/*  item={selectedApp}*/}
      {/*  save={save}*/}
      {/*/>*/}
    </>
  );
}
