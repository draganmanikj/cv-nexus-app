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
import { FTextField} from "asseco-commons";
import AlertDialog from "../../util/alert/AlertDialog";
import {useDispatch} from "react-redux"
import { divide } from 'lodash';
import { useSelector } from 'react-redux';
import LayersClearIcon from "@mui/icons-material/LayersClear";
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import operations from './duck/operations';
import FacultyDialogComponent from "./FacultyDialogComponent"
import FacultyTableComponent from "./FacultyTableComponent"

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



const initialValues={}


const FacultyComponent = () => {
    const theme = useTheme();
const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const facultyState = useSelector((state) => state.facultyReducer.faculty);
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
        dispatch(operations.createFacultyOperations(item)).then(() => {
          closeDialog("add");
    });
       
    }
    function fetchFaculty(formData){
        dispatch(operations.getFacultyOperations(formData))
        
    }
    function update(item, status){
        dispatch(operations.updateFacultyOperations(item, status)).then(() => {
          closeDialog("edit");
        });
        
    }
    const deleteFacultyRow = id => {
        dispatch(operations.deleteFacultyOperations(id));
    };
      
    const resetForm = () => {
        setRerenderGroup(!rerenderGroup);
        dispatch(operations.resetFacultyOperations());
    };
  
    return (
   <>
   <Grid style={{ marginBottom: "15px" }} item xs={12}>
          {" "}
          <SchoolIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
          <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
            {translate("app.drawer.faculties")}
        </span>
    </Grid>
    <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
            fetchFaculty(values);
        }}
        enableReinitialize
        key={rerenderGroup}
    >
            {(formikProps) => (
                <Form>
                    <Card className={classes.root} style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                        <CardHeader 
                            title={
                                <Typography variant="h6">
                                    {translate("app.faculty.header")}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={1} key={rerenderGroup}>
                                <Grid item xs={5} className={`${classes.flexGridItm} ${classes.mb025rem}`}>
                                    <Field
                                        label={translate("app.faculty.table.name")}
                                        component={FTextField}
                                        name="faculty"
                                    />
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
                                    onClick={() => {openDialog("add")}}
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
            <FacultyDialogComponent
                id={"facultyAddDialog"}
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
            <FacultyDialogComponent
                id={"facultyEditDialog"}
                open={edit}
                onClose={() => {
                  closeDialog("edit");
                }}
                create={update}
                item={selectedRow}
                setEditDialog={setEditDialog}
            />
        )}
        {openAlertDialog && (
        <AlertDialog
          id={"facultyAlertDialog"}
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
                    id={"facultyEditAlertDialog"}
                    open={editDialog}
                    item={editDialog}
                    onCloseYes={() => setEditDialog(false)}
                    onClose={() => setEditDialog(false)}
                    onFunction={(item) => item.id ? update(item) : create(item)}
                    text={translate("app.notifications.saveConfirm")}
                />
        )} 
        { deleteDialog && (
            <AlertDialog 
            id={"facultyDeleteDialog"}
            open={deleteDialog} 
            item={deleteDialog} 
            onClose={() => setDeleteDialog(false)}
            onCloseYes={() => setDeleteDialog(false)}
            onFunction={(row) => deleteFacultyRow(row.id)}
            status={deleteDialogStatus}
            text={translate("app.faculty.facultyDeleteDialog")}
        />
        )}
        {  facultyState !== undefined && facultyState.length !== 0&& (
        <Grid style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
            <FacultyTableComponent
            data={facultyState}
            onEdit={(row) => {
                openDialog("edit", row);
            }}
            onDelete={(row) => {
                setDeleteDialogStatus("true");
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
            </FacultyTableComponent>
        </Grid>
        )}
        {  facultyState !== undefined && facultyState.length === 0 && (
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
   </>
  )
}

export default FacultyComponent
