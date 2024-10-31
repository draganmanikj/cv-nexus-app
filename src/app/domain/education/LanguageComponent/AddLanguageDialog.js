import React, { useState, } from 'react';
import { Grid, Button,Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
 } from "@mui/material";
import {  FTextField, FAutocomplete } from "asseco-commons";
import SchoolIcon from '@mui/icons-material/School';
import {translate} from "../../../util/lang/translate-wrapper";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AlertDialog from '../../../util/alert/AlertDialog';
import {properties} from "../../../config/properties";
import { useDispatch } from 'react-redux';
import LanguageIcon from '@mui/icons-material/Language';
import { languageLevelsOption } from "../../../util/enum/statusEnum"

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
 }))

const AddLanguageDialog = (props) => {
    const theme = useTheme();
const classes = useStyles();
    const initialValues = {...props.item,
      languageLevel: languageLevelsOption.find(item => item.value === props.item.languageLevel)};
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { dosie } = props;

    const validationSchema = Yup.object().shape({
        language: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        languageLevel: Yup.mixed()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
      });

    return (
        <>
        <Dialog
        id={"languageAddEditDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.onClose}
        >
        <DialogTitle>
            <Grid className={classes.heading} item xs={12}>
                <LanguageIcon color={"primary"} />
                <span>
                {translate(
                    `app.dosie.other.languageForm.${
                    props.item.id ? "editTitle" : "addTitle"
                    }`
                )}
                </span>
            </Grid>
        </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {setOpenAlertDialog({...values, dosie,
                  languageLevel: values.languageLevel.value,
                })}}
            >
                {(formikProps) => (
                    <Form id={"languageForm"} autoComplete="off">

                        <DialogContent style={{padding:"4rem"}}>
                        <Grid container spacing={2} justifyContent="center" alignContent="flex-start">
                            <Grid item xs={6} className={`${classes.flexGridItm}`}>
                                <Field
                                name="language"
                                label={`${translate("app.dosie.other.languageForm.language")} *`}
                                placeholder={translate("app.dosie.other.languageForm.language")}
                                getOptionLabel={(option) => option.language}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/language/search`,
                                        method: "get",
                                        minChar: 1,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} className={`${classes.flexGridItm}`}>
                                <Field
                                name="languageLevel"
                                placeholder={`${translate("app.dosie.other.languageForm.languageLevel")} *`}
                                label={formikProps.values?.languageLevel ? `${translate("app.dosie.other.languageForm.languageLevel")} *` : ""}
                                component={FAutocomplete}
                                options={languageLevelsOption}
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
            id="languageComponentAlertDialog"
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
export default AddLanguageDialog;