import React, { useState, } from 'react';
import { Grid, Button,Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography  } from "@mui/material";
import {  FTextField, FDatePicker, FAutocomplete, FUploadField } from "asseco-commons";
import SchoolIcon from '@mui/icons-material/School';
import {translate} from "../../../util/lang/translate-wrapper";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AlertDialog from '../../../util/alert/AlertDialog';
import {properties} from "../../../config/properties";
import operationsEducation from "./duck/operations"
import { useDispatch, useSelector } from 'react-redux';
import commonsConfiguration from "asseco-commons/dist/CommonsConfiguration";
import {FilePond} from 'react-filepond'
import GetAppIcon from '@mui/icons-material/GetApp';
import IconButton from "@mui/material/IconButton";

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
    downloadButton:{
        padding: 24
    },
    downloadIcon: {
        fontSize: "2em",
        marginTop: "1rem"
    },
    uploadCompStyles: {
        "& .filepond--root":{
          marginBottom: 0
        },
        "& .filepond--credits": {
          display: "none !important",
        },
      },
 }))

 const checkUploadedFile = (formData) => {
    if (formData) {
        if(formData.diploma){
      return [
        {
            metadata: {
                url: formData.diploma.uri,
              },
            diploma: {
              name: formData.diploma.name,
              size: formData.diploma.size,
              type: formData.diploma.type,
              url: formData.diploma.uri,
            },
            type: "local",
        },
      ];
    }
    if (formData.uverenie) {
        return [
          {
            options: {
              type: "local",
              uverenie: {
                name: formData.uverenie.name,
                size: formData.uverenie.size,
                type: formData.uverenie.type,
              },
              metadata: {
                url: formData.uverenie.uri,
              },
            },
          },
        ];
      } 

}
    else return [];
  };

const AddEducationDialog = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
const classes = useStyles();
    const initialValues = {...props.item,
        diplomaName: props.item.diplomaUrl ? props.item.diplomaUrl.substring(0, props.item.diplomaUrl.indexOf('-'))  + (props.item.diplomaUrl.slice(props.item.diplomaUrl.lastIndexOf('.'))) : undefined,
        uverenieName: props.item.uverenieUrl ? props.item.uverenieUrl.substring(0, props.item.uverenieUrl.indexOf('-'))  + (props.item.uverenieUrl.slice(props.item.uverenieUrl.lastIndexOf('.')))  : undefined
    };
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { dosie } = props;
    const [diplomaFile, setDiplomaFile] = useState(undefined);
    const [uverenieFile, setUverenieFile] = useState(undefined);
    const [initialFiles, setInitialFiles] = useState(
        checkUploadedFile(initialValues)
      );

    const validationSchema = Yup.object().shape({
        drzava: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        facultyModel: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        universityModel: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        degreeEducation: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        titleEducation: Yup.string()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        dateStart: Yup.date()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        dateEnd: Yup.date()
            .test("dateEndGreatedThenDateStart", (translate("app.dosie.other.trainingsForm.unvalidDate")), function(value){
                const {dateStart} = this.parent;
                if(value === undefined || !value)
                    return true;
                return new Date(value) > new Date(dateStart)
            })
            .nullable(),
      });

    return (
        <>
        <Dialog
        id={"educationAddEditDialog"}
        // fullWidth={true}
        maxWidth="xl"
        open={props.open}
        onClose={props.onClose}
        >
        <DialogTitle>
            <Grid className={classes.heading} item xs={12}>
                <SchoolIcon color={"primary"} />
                <span>
                {translate(
                    `app.dosie.other.educationForm.${
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
                    diploma: diplomaFile ? {
                        encodedFile: diplomaFile.encodedFile,
                        name: diplomaFile.name,
                        size:diplomaFile.size,
                        type: diplomaFile.type,
                        lastModified:  diplomaFile.lastModified,
                    } : null,
                    uverenie: uverenieFile ? {
                        encodedFile: uverenieFile.encodedFile,
                        name: uverenieFile.name,
                        size:uverenieFile.size,
                        type: uverenieFile.type,
                        lastModified:  uverenieFile.lastModified,
                    } : null})}}
            >
                {(formikProps) => (
                    <Form id={"dosieEducationForm"} autoComplete="off">

                        <DialogContent style={{padding:"4rem"}}>
                        <Grid container spacing={2} justifyContent="center" alignContent="flex-start" className={classes.uploadCompStyles}>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.country !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.country !== undefined ? "red" : "initial",
                                    marginBottom:"1rem"
                                }}>
                                <Field
                                name="drzava"
                                label={`${translate("app.dosie.other.educationForm.country")} *`}
                                placeholder={translate("app.dosie.other.educationForm.country")}
                                getOptionLabel={(option) => option.ime}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/drzava/search`,
                                        method: "get",
                                        minChar: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.faculty !== undefined ? "85px" : "68px",
                                    color: formikProps.errors.faculty !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="facultyModel"
                                label={`${translate("app.dosie.other.educationForm.faculty")} *`}
                                placeholder={translate("app.dosie.other.educationForm.faculty")}
                                getOptionLabel={(option) => option.faculty}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/faculty/search`,
                                        method: "get",
                                        minChar: 1,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.university !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.university !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="universityModel"
                                label={`${translate("app.dosie.other.educationForm.university")} *`}
                                placeholder={translate("app.dosie.other.educationForm.university")}
                                getOptionLabel={(option) => option.university}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/university/search`,
                                        method: "get",
                                        minChar: 1,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.degree !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.degree !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="degreeEducation"
                                label={`${translate("app.dosie.other.educationForm.degree")} *`}
                                placeholder={translate("app.dosie.other.educationForm.degree")}
                                getOptionLabel={(option) => option.degree}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/degree`,
                                        method: "get",
                                        minChar: 1,
                                    }}
                                
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                name="directionEducation"
                                label={translate("app.dosie.other.educationForm.directionEducation")}
                                component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.titleEducation !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.titleEducation !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="titleEducation"
                                label={`${translate("app.dosie.other.educationForm.titleEducation")} *`}
                                component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.dateStart !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.dateStart !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="dateStart"
                                label={`${translate("app.dosie.other.educationForm.dateStart")} *`}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                name="dateEnd"
                                label={translate("app.dosie.other.educationForm.dateEnd")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>

                            <Grid item xs={12} >
                            {
                                         !formikProps.values.diploma ? (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {translate("app.dosie.other.educationForm.attachDiploma")}
                                                    </Typography>
                                                    <Field
                                                        acceptedFileTypes={["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf",'application/doc',]}
                                                        labelFileTypeNotAllowed={translate(
                                                            "app.editDialog.invalidFormat"
                                                        )}
                                                        fileValidateTypeLabelExpectedTypes={
                                                            translate("app.editDialog.expectedFormat") +
                                                            " {allTypes}"
                                                        }
                                                        labelIdle={`${translate(
                                                          "app.generic.dragAndDropDocument"
                                                        )} <span class="filepond--label-action"> ${translate(
                                                          "app.generic.browseDocument"
                                                        )} </span>`}
                                                        instantUpload={false}
                                                        name="fileWithForm"
                                                        id="fileWithForm"
                                                        fullWidth
                                                        margin="normal"
                                                        labelButtonProcessItem="Upload"
                                                        maxFileSize="2GB"
                                                        allowFileEncode
                                                        component={FUploadField}
                                                        onaddfile={(error, file) => {
                                                            if(error !== null)
                                                                setDiplomaFile(undefined)
                                                            else{
                                                                setDiplomaFile({
                                                                    encodedFile: file.getFileEncodeBase64String(),
                                                                    name: file.file.name,
                                                                    size: file.file.size,
                                                                    type: file.file.type,
                                                                    lastModified:  file.lastModified,
                                                                });
                                                            }
                                                        }}

                                                    />
                                                </Grid>
                                        ) :
                                             <Grid
                                                 container
                                                 xs={12}
                                                 sm={12}
                                             >
                                                 <Grid item xs={10} sm={10} >
                                                     <Typography color="textSecondary" variant="body2" >
                                                     {translate("app.dosie.other.educationForm.attachDiplomaFinal")}
                                                     </Typography>
                                                     <Grid item xs={11} alignItems={"center"} justifyContent={"flex-end"}>
                                                      <Field
                                                      name="diplomaName"
                                                      label={translate("app.dosie.other.file")}
                                                      component={FTextField}
                                                      disabled={true}
                                                      size='medium'
                                                      margin='none'
                                                       />
                                                      </Grid>
                                                      <Field
                                                        acceptedFileTypes={["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf",'application/doc',]}
                                                        labelFileTypeNotAllowed={translate(
                                                            "app.editDialog.invalidFormat"
                                                        )}
                                                        fileValidateTypeLabelExpectedTypes={
                                                            translate("app.editDialog.expectedFormat") +
                                                            " {allTypes}"
                                                        }
                                                        labelIdle={`${translate(
                                                          "app.dosie.other.changeFile"
                                                        )}`}
                                                        instantUpload={false}
                                                        name="fileWithForm"
                                                        id="fileWithForm"
                                                        fullWidth
                                                        margin="normal"
                                                        labelButtonProcessItem="Upload"
                                                        maxFileSize="2GB"
                                                        allowFileEncode
                                                        component={FUploadField}
                                                        onaddfile={(error, file) => {
                                                            if(error !== null)
                                                                setDiplomaFile(undefined)
                                                            else{
                                                                setDiplomaFile({
                                                                    encodedFile: file.getFileEncodeBase64String(),
                                                                    name: file.file.name,
                                                                    size: file.file.size,
                                                                    type: file.file.type,
                                                                    lastModified:  file.lastModified,
                                                                });
                                                            }
                                                        }}

                                                    />
                                                 </Grid>
                                                 <Grid item xs={2} sm={2} alignItems={"center"} justifyContent={"flex-end"} style={{marginTop: "2rem"}}
                                                   >
                                                     <IconButton
                                                         color="secondary"
                                                         variant="contained"
                                                         onClick={() => {
                                                            dispatch(
                                                              operationsEducation.downloadDiplomaEducation(
                                                                formikProps.values.id,
                                                                formikProps.values.diploma.name.substring(0, formikProps.values.diploma.name.indexOf('-')) + (props.item.diplomaUrl.slice(props.item.diplomaUrl.lastIndexOf('.'))) 
                                                              )
                                                            );
                                                          }}
                                                         size={"medium"}
                                                         edge={"end"}
                                                         disableRipple={true}
                                                         className={classes.downloadButton}
                                                     >
                                                         <GetAppIcon  extension={".docx"}
                                                                    className={classes.downloadIcon}
                                                                    color='primary'
                                                         />
                                                         <Typography color="primary" variant="body2" style={{ fontSize: 'smaller', marginTop:"5px" }}>
                                                     {translate("app.dosie.other.download")}
                                                     </Typography>
                                                     </IconButton>
                                                     
                                                 </Grid>
                                             </Grid>


                                    }
                                </Grid>
                                <Grid item xs={12}>
                                {
                                         !formikProps.values.uverenie ? (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {translate("app.dosie.other.educationForm.attachCertificate")}
                                                    </Typography>
                                                    <Field
                                                        acceptedFileTypes={["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf",'application/doc',]}
                                                        labelFileTypeNotAllowed={translate(
                                                            "app.editDialog.invalidFormat"
                                                        )}
                                                        fileValidateTypeLabelExpectedTypes={
                                                            translate("app.editDialog.expectedFormat") +
                                                            " {allTypes}"
                                                        }
                                                        labelIdle={`${translate(
                                                          "app.generic.dragAndDropDocument"
                                                        )} <span class="filepond--label-action"> ${translate(
                                                          "app.generic.browseDocument"
                                                        )} </span>`}
                                                        instantUpload={false}
                                                        name="fileWithForm"
                                                        id="fileWithForm"
                                                        fullWidth
                                                        margin="normal"
                                                        labelButtonProcessItem="Upload"
                                                        maxFileSize="2GB"
                                                        allowFileEncode
                                                        component={FUploadField}
                                                        onaddfile={(error, file) => {
                                                            if(error !== null)
                                                                setUverenieFile(undefined)
                                                            else{
                                                                setUverenieFile({
                                                                    encodedFile: file.getFileEncodeBase64String(),
                                                                    name: file.file.name,
                                                                    size: file.file.size,
                                                                    type: file.file.type,
                                                                    lastModified:  file.lastModified,
                                                                });
                                                            }
                                                        }}

                                                    />
                                                </Grid>
                                        ) :
                                             <Grid
                                                 container
                                                 xs={12}
                                                 sm={12}
                                             >
                                                 <Grid item xs={10} sm={10} >
                                                     <Typography color="textSecondary" variant="body2" >
                                                     {translate("app.dosie.other.educationForm.attachCertificateFinal")}
                                                     </Typography>
                                                     <Grid item xs={11} alignItems={"center"} justifyContent={"flex-end"}>
                                                      <Field
                                                      name="uverenieName"
                                                      label={translate("app.dosie.other.file")}
                                                      component={FTextField}
                                                      disabled={true}
                                                      size='medium'
                                                      margin='none'
                                                       />
                                                      </Grid>
                                                      <Field
                                                        acceptedFileTypes={["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf",'application/doc',]}
                                                        labelFileTypeNotAllowed={translate(
                                                            "app.editDialog.invalidFormat"
                                                        )}
                                                        fileValidateTypeLabelExpectedTypes={
                                                            translate("app.editDialog.expectedFormat") +
                                                            " {allTypes}"
                                                        }
                                                        labelIdle={`${translate(
                                                          "app.dosie.other.changeFile"
                                                        )}`}
                                                        instantUpload={false}
                                                        name="fileWithForm"
                                                        id="fileWithForm"
                                                        fullWidth
                                                        margin="normal"
                                                        labelButtonProcessItem="Upload"
                                                        maxFileSize="2GB"
                                                        allowFileEncode
                                                        component={FUploadField}
                                                        onaddfile={(error, file) => {
                                                            if(error !== null)
                                                                setUverenieFile(undefined)
                                                            else{
                                                                setUverenieFile({
                                                                    encodedFile: file.getFileEncodeBase64String(),
                                                                    name: file.file.name,
                                                                    size: file.file.size,
                                                                    type: file.file.type,
                                                                    lastModified:  file.lastModified,
                                                                });
                                                            }
                                                        }}

                                                    />
                                                 </Grid>
                                                 <Grid item xs={2} sm={2} alignItems={"center"} justifyContent={"flex-end"} style={{marginTop: "2rem"}}
                                                   >
                                                     <IconButton
                                                         color="secondary"
                                                         variant="contained"
                                                         onClick={() => {
                                                            dispatch(
                                                              operationsEducation.downloadDiplomaEducation(
                                                                formikProps.values.id,
                                                                formikProps.values.uverenie.name.substring(0, formikProps.values.uverenie.name.indexOf('-')) + (props.item.uverenieUrl.slice(props.item.uverenieUrl.lastIndexOf('.'))) 
                                                              )
                                                            );
                                                          }}
                                                         size={"medium"}
                                                         edge={"end"}
                                                         disableRipple={true}
                                                         className={classes.downloadButton}
                                                     >
                                                         <GetAppIcon  extension={".docx"}
                                                                    className={classes.downloadIcon}
                                                                    color='primary'
                                                         />
                                                         <Typography color="primary" variant="body2" style={{ fontSize: 'smaller', marginTop:"5px" }}>
                                                     {translate("app.dosie.other.download")}
                                                     </Typography>
                                                     </IconButton>
                                                     
                                                 </Grid>
                                             </Grid>


                                    }
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
            id="educationComponentAlertDialog"
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
export default AddEducationDialog;