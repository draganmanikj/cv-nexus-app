import React, { useState, } from 'react';
import { Grid, Button,Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,  } from "@mui/material";
import {  FTextField, FDatePicker} from "asseco-commons";
import {translate} from "../../../util/lang/translate-wrapper";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AlertDialog from '../../../util/alert/AlertDialog';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';

const useStyles = makeStyles ((theme) => ({ 
    heading: {
        height: "30px !important",
        "& .MuiSvgIcon-root":{
            fontSize: "20px !important",
            marginRight: "1rem !important"
        },
        "& span":{
            fontSize: "20px",
            color: "#3452b4",
        }
    },
 }))



const AddProjectsDialog = (props) => {
    const theme = useTheme();
const classes = useStyles();
    const initialValues = {...props.item};
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { dosie } = props;
    const validationSchema = Yup.object().shape({
        institution: Yup.string()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        name: Yup.string()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        role: Yup.string()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        dateStart: Yup.date()
            .nullable(),
        dateEnd: Yup.date()
            .test("dateEndGreatedThenDateStart", (translate("app.dosie.other.trainingsForm.unvalidDate")), function(value){
                const {dateStart} = this.parent;
                if(value === undefined)
                    return true;
                return new Date(value) > new Date(dateStart)
            })
            .nullable(),
      });

    return (
        <>
        <Dialog
        id={"projectsAddEditDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.onClose}
        >
        <DialogTitle>
            <Grid className={classes.heading} item xs={12}>
                <LaptopChromebookIcon color={"primary"} />
                <span>
                {translate(
                    `app.dosie.other.projectsForm.${
                    props.item.id ? "editTitle" : "addTitle"
                    }`
                )}
                </span>
            </Grid>
        </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {setOpenAlertDialog({...values, dosie})}}
            >
                {(formikProps) => (
                    <Form id={"dosieEducationForm"} autoComplete="off">

                        <DialogContent style={{padding:"4rem"}}>
                        <Grid container spacing={2} justifyContent="center" alignContent="flex-start">
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.country !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.country !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="institution"
                                label={`${translate("app.dosie.other.projectsForm.institution")} *`}
                                placeholder={translate("app.dosie.other.projectsForm.institution")}
                                component={FTextField}
                                
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.country !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.country !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="name"
                                label={`${translate("app.dosie.other.projectsForm.name")} *`}
                                placeholder={translate("app.dosie.other.projectsForm.name")}
                                component={FTextField}
                                
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.country !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.country !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="description"
                                label={translate("app.dosie.other.projectsForm.description")}
                                placeholder={translate("app.dosie.other.projectsForm.description")}
                                component={FTextField}
                                
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.country !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.country !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="role"
                                label={`${translate("app.dosie.other.projectsForm.role")} *`}
                                placeholder={translate("app.dosie.other.projectsForm.role")}
                                component={FTextField}
                                
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                name="dateStart"
                                label={translate("app.dosie.other.projectsForm.dateStart")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                name="dateEnd"
                                label={translate("app.dosie.other.projectsForm.dateEnd")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>

                        </Grid>
                        </DialogContent>
                        <DialogActions style={{marginBottom: "1rem"}}>
                            <Button color="primary" type="submit" variant="outlined" style={{ marginRight: "1rem" }}>
                            {translate("app.generic.save")}
                            </Button>
                            <Button color="secondary" onClick={props.onClose} variant="outlined">
                            {translate("app.generic.cancel")}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
            </Dialog>
            
            {openAlertDialog && (
            <AlertDialog
            id="projectsComponentAlertDialog"
            open={openAlertDialog}
            item={openAlertDialog}
            onClose={() => setOpenAlertDialog(false)}
            onCloseYes={() => setOpenAlertDialog(false)}
            onFunction={(values) => {props.save(values)}}
            text={translate("app.notifications.saveConfirm")}
            />
      )}
        </>
    )
}
export default AddProjectsDialog;