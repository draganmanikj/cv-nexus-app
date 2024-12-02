import React , {useState} from "react";
import {
  FAutocomplete,
  FTextField,
  FDatePicker,
} from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
// import GroupsAddDialog from "./GroupsAddDialog";
import WorkingPositionTypesTable from "./WorkingPositionTypesTable";
import WorkingPositionTypesAddDialog from "./WorkingPositionTypesAddDialog";
import {useDispatch, useSelector} from "react-redux";
import operations from "./duck/operations";
// import AddGroupUsers from "./AddGroupUsers";
// import GroupsTable from "./GroupsTable";
import {
  Button,
  Paper,
  Grid,
  Card,
  CardHeader,
  Typography,
  Tooltip,
  CardContent,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { properties } from "../../config/properties";
import GroupIcon from "@mui/icons-material/Group";
import CardActions from "@mui/material/CardActions";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import AddIcon from "@mui/icons-material/Add";
import WorkOutline from '@mui/icons-material/WorkOutline';
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import AlertDialog from "../../util/alert/AlertDialog";
import _ from "lodash";
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
import * as Yup from "yup";
import LockScreenDialog from "../../util/lock/LockScreenDialog";

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
  flexEnd:{
    justifyContent:"flex-end"
  }
})
export default function GroupsComponent(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const [rerenderGroup, setRerenderGroup] = useState(true);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [status, setStatus] = useState(undefined);
  const [dateCreatedBoundaries, setDateCreatedBoundaries] = useState(false);
  const [dateModifiedBoundaries, setDateModifiedBoundaries] = useState(false);
  const username = useSelector((state) => state.oidc.user?.profile.user_name);

  const rerender = () => {
    setRerenderGroup(!rerenderGroup);
    props.resetWorkingPositionTypes();
  };

  const initialValues = {};

  function openDialog(dialog, row) {
    // setOpenAddEdit(true);

    if (dialog === "add") {
      setOpen(true);
      setSelectedRow(false);
    } else if (dialog === "edit") {
      setEdit(true);
      setSelectedRow(row);
    }

  }

  function closeDialog(dialog) {
    if (dialog === "add") setOpen(false);
    else if (dialog === "edit") setEdit(false);
  }

  const searchGroups = (formData) => {
    dispatch(operations.fetchWorkingPositionTypes(formData));
  };

  function save(item) {
    dispatch(operations.createWorkingPosType(item)).then(() => {
      closeDialog("add");
    });
  }

  function update(item, status) {
    dispatch(operations.updateWorkingPosType(item, status)).then(() => {
      closeDialog("edit");
    });
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(120, translate("app.notifications.maxLength120")).nullable(),
    nameMk: Yup.string().max(120, translate("app.notifications.maxLength120")).nullable(),
    createdBy: Yup.string().max(120, translate("app.notifications.maxLength120")).nullable(),
    modifiedBy: Yup.string().max(120, translate("app.notifications.maxLength120")).nullable(),
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
          <WorkOutline color={"primary"} style={{ fontSize: "25px" }} />{" "}
          <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
            {translate("app.drawer.workingPositionTypes")}
        </span>
        </Grid>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                isInitialValid={true}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    searchGroups(values).then(() => {
                      actions.setSubmitting(false);
                    });
                }}
                key={rerenderGroup}
                render={(formikProps) => (
                    <Form id={"workingPositionTypesSearchForm"} autoComplete="off">
                      <Card className={classes.root} style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                        <CardHeader
                            title={
                              <Typography variant="h6">
                                {translate("app.workingPositionTypes.formularPrebarajHeader")}
                              </Typography>
                            }
                        />                        

                        <CardContent>
                            <Grid container spacing={2} key={rerenderGroup} style={{alignItems:"center"}}>
                                  <Grid item xs={2} >
                                    <Field
                                        name="name"
                                        label={translate("app.workingPositionTypes.table.name")}
                                        component={FTextField}
                                    />
                                  </Grid>
                                  <Grid item xs={2} >
                                    <Field
                                        name="nameMk"
                                        label={translate("app.workingPositionTypes.table.nameMk")}
                                        component={FTextField}
                                    />
                                  </Grid>
                                  <Grid item xs={2} >
                                    <Field
                                        name="createdBy"
                                        label={translate(
                                            "app.groups.table.createdBy"
                                        )}
                                        component={FTextField}
                                    />
                                  </Grid>
                                  {dateCreatedBoundaries === false ?
                                      <>
                                        <Grid item xs={2}>
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
                                        <Grid item xs={1}>
                                          <Tooltip title={translate("app.groups.swapToBoundaries")}>
                                            <IconButton
                                                style={{color: "white", backgroundColor: "#3f51b5"}}
                                                onClick={() => {
                                                  formikProps.setFieldValue("dateCreated", null);
                                                  formikProps.setFieldValue("dateCreated_from", null);
                                                  formikProps.setFieldValue("dateCreated_to", null);
                                                  setDateCreatedBoundaries(!dateCreatedBoundaries)
                                                }}
                                                aria-label="Close"
                                            >
                                              <DateRangeIcon/>
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                      </>
                                      :
                                      <>
                                        <Grid item xs={2} >
                                          <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                            <Field
                                                name="dateCreated_from"
                                                label={translate(
                                                    "app.groups.table.dateCreatedFrom"
                                                )}
                                                component={FDatePicker}
                                                format={"DD.MM.YYYY"}
                                                onChange={(value) => {
                                                  formikProps.setFieldValue("dateCreated_from", value);
                                                  if(formikProps.values.dateCreated_to === undefined || formikProps.values.dateCreated_to === null || value === null){
                                                    formikProps.setFieldValue("dateCreated_to", value);
                                                  }
                                                }}
                                            />
                                          </div>
                                        </Grid>
                                        <Grid item xs={2} >
                                          <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                            <Field
                                                name="dateCreated_to"
                                                label={translate(
                                                    "app.groups.table.dateCreatedTo"
                                                )}
                                                component={FDatePicker}
                                                format={"DD.MM.YYYY"}
                                                onChange={(value) => {
                                                  formikProps.setFieldValue("dateCreated_to", value);
                                                  if(formikProps.values.dateCreated_from === undefined || formikProps.values.dateCreated_from === null || value === null){
                                                    formikProps.setFieldValue("dateCreated_from", value);
                                                  }
                                                }}
                                            />
                                          </div>
                                        </Grid>
                                        <Grid item xs={1} >
                                          <Tooltip title={translate("app.groups.swapToExact")}>
                                            <IconButton
                                                style={{color: "white", backgroundColor: "#3f51b5"}}
                                                onClick={() => {
                                                  formikProps.setFieldValue("dateCreated", null);
                                                  formikProps.setFieldValue("dateCreated_from", null);
                                                  formikProps.setFieldValue("dateCreated_to", null);
                                                  setDateCreatedBoundaries(!dateCreatedBoundaries)
                                                }}
                                                aria-label="Close"
                                            >
                                              <TodayIcon/>
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                      </>
                                  }
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
                            {translate("app.workingPositionTypes.dodadiButton")}
                          </Button>
                        </span>
                            </Tooltip>
                        </CardActions>
                        <CardActions className={classes.flexEnd}>
                      <Tooltip title={translate("app.generic.search")}>
                      <span>
                      <Button                         
                          size="small"
                          color="primary"
                          type="submit"
                          variant="outlined"
                          disabled={!formikProps.isValid}
                      >
                        <SearchIcon />
                        {translate("app.generic.search")}
                      </Button>
                    </span>
                    </Tooltip>
                            <Tooltip title={translate("app.workingPositionTypes.iscistiFiltri")}>
                        <span>
                          <Button
                              size="small"
                              type="button"
                              variant="contained"
                              color={"secondary"}
                              onClick={() => {
                                rerender();
                              }}
                          >
                            <ClearAllIcon />
                            {translate("app.workingPositionTypes.iscistiFiltriButton")}
                          </Button>
                        </span>
                            </Tooltip>
                        </CardActions>
                      </Card>
                    </Form>
                )}
            />
        <br />

        <LockScreenDialog open={props.loading} id={"workingPositionTypesLockScreen"}/>

        {props.workingPositionTypes !== undefined && props.workingPositionTypes.length !== 0 && (
            <Grid style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
              <WorkingPositionTypesTable
                  data={props.workingPositionTypes}
                  onEdit={(row) => {
                    openDialog("edit", row);
                  }}
                  onDelete={(row) => {
                    props.deleteWorkingPosition(row.id);
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


        {props.workingPositionTypes !== undefined && props.workingPositionTypes.length === 0 && (
            <Grid
                style={{ marginTop: "10px", textAlign: "center" }}
                container
                spacing={3}
               
            >
              <Grid item xs={12}>
                <Paper >
                  <LayersClearIcon />
                  <Typography component="h5" variant="h6" color=" inherit" noWrap>
                    {translate("app.workingPositionTypes.noResult")}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
        )}

        {open && (
            <WorkingPositionTypesAddDialog
                id={"workingPositionTypesAddDialog"}
                open={open}
                onClose={() => {
                  closeDialog("add");
                }}
                save={save}
                item={selectedRow}
            />
        )}

        {edit && (
            <WorkingPositionTypesAddDialog
                id={"workingPositionTypesEditDialog"}
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
                id={"workingPositionTypesAlertDialog"}
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
      </>
  );
}
