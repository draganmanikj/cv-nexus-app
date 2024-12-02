import React, { useState} from 'react';

import {
    Button,
    
    Paper,
    Grid,
    Card,
    CardActions,
    CardHeader,
    Typography,
    Tooltip,
    CardContent,
    IconButton,
  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkOutline from '@mui/icons-material/WorkOutline';
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import { translate } from "../../util/lang/translate-wrapper";
import { Field, Formik, Form } from 'formik';
import { FTextField, FDatePicker} from "asseco-commons";
import { writeFileXLSX } from 'xlsx';
import RolesPositionTypesDialogComponent from "./RolesPositionTypesDialogComponent"
import * as Yup from "yup";
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
import operations from './duck/operations';
import {useDispatch} from "react-redux"
import RolesPositionTypesTable from "./RolesPositionTypesTable"
import AlertDialog from "../../util/alert/AlertDialog";
import { useSelector } from 'react-redux';
import LayersClearIcon from "@mui/icons-material/LayersClear";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

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


const RolesPositionTypesComponent = (props) => {

  const theme = useTheme();
const classes = useStyles();
const dispatch = useDispatch()
const [open, setOpen] = useState(false)
const [rolePositions, setRolePositions] = useState();
const rolePositionsState = useSelector((state) => state.rolesPositions.rolePositionTypes);
const [dateCreatedBoundaries, setDateCreatedBoundaries] = useState(false);
const [selectedRow, setSelectedRow] = useState();
const [edit, setEdit] = useState(false)
const [rerenderGroup, setRerenderGroup] = useState(true);
const [status, setStatus] = useState(undefined);
const [openAlertDialog, setOpenAlertDialog] = useState(false);
const [deleteDialog, setDeleteDialog] = useState(false)
const [deleteDialogStatus, setDeleteDialogStatus] = useState(undefined);
const [editDialog, setEditDialog] = useState(false)
const [editDialogStatus, setEditDialogStatus] = useState(undefined)



function openDialog(dialog, row){
    if(dialog === "add"){
        setOpen(true);
        setSelectedRow({});
    } else if(dialog == "edit"){
        setEdit(true);
        setSelectedRow(row);

    }
}



function closeDialog(dialog){
    if(dialog === "add"){
        setOpen(false);
    } else if(dialog === "edit"){
      setEdit(false);
    }
}


function create(item){
    dispatch(operations.createRole(item)).then(() => {
      closeDialog("add");
    });
   
}

function update(item, status){
  dispatch(operations.updateRole(item, status)).then(() => {
    closeDialog("edit");
  });
  
}

function getRolePosition (formData) {
  dispatch(operations.fetchRole(formData)).then((res) => {
    setRolePositions(res);
  })
}

const resetForm = () => {
  setRerenderGroup(!rerenderGroup);
  dispatch(operations.resetRolePosType());
};

const deleteRolePosRow = id => {
  dispatch(operations.deleteRole(id));
};



const initialValues = {};
  return (
    <>
     <Grid style={{ marginBottom: "15px" }} item xs={12}>
          {" "}
          <EmojiPeopleIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
          <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
            {translate("app.drawer.rolesPositionTypes")}
        </span>
        </Grid>
    <Formik 
        initialValues={initialValues}
        enableReinitialize={true}
        key={rerenderGroup}
        onSubmit={(values) => {
          getRolePosition(values);
      }}
    >
      {(formikProps) => (
        <Form>
            <Card className={classes.root} style={{border:"2px solid #00a3e0", borderRadius:"5px"}}> 
                <CardHeader
                    title={
                        <Typography variant="h6">
                            {translate("app.rolesPositionTypes.header")}
                        </Typography>
                    }
                    />
                <CardContent>
                        <Grid container spacing={2} key={rerenderGroup} style={{alignItems:"center"}}>
                            <Grid item xs={2}>
                                <Field
                                    label={translate("app.rolesPositionTypes.table.name")}
                            
                                    component={FTextField}
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Field
                                    label={translate("app.rolesPositionTypes.table.nameMK")}
                                    component={FTextField}
                                    name="nameMK"
                                />
                            </Grid>
                            <Grid item xs={2}>
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
                                    label={translate("app.groups.table.dateCreated")}
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
                            
                            <Grid item xs={2}>
                              <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                <Field
                                      name="dateCreated_from"
                                      label={translate("app.groups.table.dateCreatedFrom")}
                                      component={FDatePicker}
                                      format={"DD.MM.YYYY"}
                                      onChange={(value) => {
                                        formikProps.setFieldValue("dateCreated_from",value)
                                        if(formikProps.values.dateCreated_to === undefined || formikProps.values.dateCreated_to === null || value ===null){
                                          formikProps.setFieldValue("dateCreated_to",value)
                                        }
                                      }}
                                >
                                </Field>
                              </div>
                            </Grid>
                            <Grid item xs={2}>
                              <div style={{border:"1px solid lightgrey", borderBottom:"1px solid lightgrey", borderRadius:"5px", width:"100%"}}>
                                  <Field
                                        name="dateCreated_to"
                                        label={translate("app.groups.table.dateCreatedTo")}
                                        component={FDatePicker}
                                        format={"DD.MM.YYYY"}
                                        onChange={(value) => {
                                          formikProps.setFieldValue("dateCreated_to",value)
                                          if(formikProps.values.dateCreated_from === undefined || formikProps.values.dateCreated_from === null || value ===null){
                                            formikProps.setFieldValue("dateCreated_from",value)
                                          }
                                        }}
                                  >
                                  </Field>
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
                            onClick={() => {openDialog("add")}}
                        >
                            <AddIcon />
                            {translate("app.generic.add")}
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
                        <SearchIcon/>
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
                            onClick={() => {resetForm()}}
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
    </Formik>
    {open && (
            <RolesPositionTypesDialogComponent
                id={"rolePositonTypesAddDialog"}
                open={open}
                onClose={() => {
                  closeDialog("add");
                }}
                create={create}
                item={selectedRow}
                setEditDialog={setEditDialog}
            />
    )}
    {edit && (
            <RolesPositionTypesDialogComponent
                id={"rolePositionTypesEditDialog"}
                open={edit}
                onClose={() => {
                  closeDialog("edit");
                }}
                create={update}
                item={selectedRow}
                setEditDialog={setEditDialog}
            />
    )}
    {rolePositionsState !== undefined && rolePositionsState.length === 0 && (
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

    { rolePositionsState !== undefined && rolePositionsState.length !== 0 && (
      <Grid style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
          <RolesPositionTypesTable
              data={rolePositionsState}
              onEdit={(row) => {
              
                openDialog("edit", row);
              }}
              onDelete={(row) => {
                
                setDeleteDialogStatus("true")
                setDeleteDialog(row);
              }}
              onActivate={(row) => {
                setStatus("true");
                setOpenAlertDialog(row);
              }}
              onDeactivate={(row) => {
                setStatus("false");
                setOpenAlertDialog(row);
              }}
          >
          </RolesPositionTypesTable>
      </Grid>
    )}
    { deleteDialog && (
      <AlertDialog 
        id={"rolesPositionTypeDeleteDialog"}
        open={deleteDialog} 
        item={deleteDialog} 
        onClose={() => setDeleteDialog(false)}
        onCloseYes={() => setDeleteDialog(false)}
        onFunction={(row) => deleteRolePosRow(row.id)}
        status={deleteDialogStatus}
        text={translate("app.rolesPositionTypes.rolPositionDeleteDialog")}

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
      {editDialog && (
                <AlertDialog
                    id={"workingPositionTypesAlertDialog"}
                    open={editDialog}
                    item={editDialog}
                    onCloseYes={() => setEditDialog(false)}
                    onClose={() => setEditDialog(false)}
                    onFunction={(item) => item.id ? update(item) : create(item)}
                    text={translate("app.notifications.saveConfirm")}
                />
            )}
    </>

  )
}

export default RolesPositionTypesComponent

