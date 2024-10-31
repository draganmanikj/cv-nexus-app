import React, { useState} from 'react';
import { Grid, Button,Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,  
    createChainedFunction} from "@mui/material";
import {  FTextField, FDatePicker, FAutocomplete, FUploadField } from "asseco-commons";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {translate} from "../../../util/lang/translate-wrapper";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AlertDialog from '../../../util/alert/AlertDialog';
import {properties} from "../../../config/properties";
import {locationOptions, realizationStatusOptions} from "../../../util/enum/statusEnum"
import operationsTrainings from "./duck/operations"
import { useDispatch} from 'react-redux';
import commonsConfiguration from "asseco-commons/dist/CommonsConfiguration";
import IconButton from "@mui/material/IconButton";
import {FilePond} from 'react-filepond'
import * as FilePondTool from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
import GetAppIcon from '@mui/icons-material/GetApp';
import actions from "./duck/actions"

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
 
 FilePondTool.registerPlugin(FilePondPluginFileValidateType);
 FilePondTool.registerPlugin(FilePondPluginFileEncode);
 FilePondTool.registerPlugin(FilePondPluginGetFile); 
 
 
 const checkUploadedFile = (formData) => {
    if (formData) {
        if(formData.obuka){
      return [
        {
            options: {
                type: "local", // indicates an already uploaded file
    
                // mock file information
                obuka: {
                  name: formData.obuka.name,
                  size: formData.obuka.size,
                  type: formData.obuka.type,
                },
                metadata: {
                  url: formData.obuka.uri,
                },
              },
        },
      ];
    }
    if (formData.certificate) {
        return [
          {
            options: {
              type: "local",
            certificate: {
                name: formData.certificate.name,
                size: formData.certificate.size,
                type: formData.certificate.type,
              },
              metadata: {
                url: formData.certificate.uri,
              },
            },
          },
        ];
      } 

}
    else return [];
  };


const AddTrainingsDialog = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
const classes = useStyles();
    const  initialValues = {...props.item,
         location: locationOptions.find(item => item.value === props.item.location),
         realizationStatus: realizationStatusOptions.find(item => item.value === props.item.realizationStatus),
         obukaName: props.item.obukaUrl ? props.item.obukaUrl.substring(0, props.item.obukaUrl.indexOf('-'))  + (props.item.obukaUrl.slice(props.item.obukaUrl.lastIndexOf('.')))  : undefined,
         certificateName: props.item.certificateUrl ? props.item.certificateUrl.substring(0, props.item.certificateUrl.indexOf('-'))  + (props.item.certificateUrl.slice(props.item.certificateUrl.lastIndexOf('.'))) : undefined,} 
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { dosie } = props;
    const [obukaFile, setObukaFile] = useState(undefined);
    const [certificateFile, setCertificateFile] = useState(undefined);
    const [initialFiles, setInitialFiles] = useState(
        checkUploadedFile(initialValues)
      );


    const validationSchema = Yup.object().shape({
        type: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        area: Yup.object()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        name: Yup.string()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        location: Yup.mixed()
            .required(translate("app.notifications.errorRequired"))
            .nullable(),
        realizationStatus: Yup.mixed()
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
        certificateDateFrom: Yup.date()
            .nullable(),
        certificateDateTo: Yup.date()
            .test("certificateDateToGreatedThencertificateDateFrom", (translate("app.dosie.other.trainingsForm.unvalidDate")), function(value){
                const {certificateDateFrom} = this.parent;
                if(value === undefined)
                    return true;
                return new Date(value) > new Date(certificateDateFrom)
            })
            .nullable(),
        
      });
    return (
        <>
        <Dialog
        id={"trainingsAddEdforitDialog"}
        // fullWidth={true}
        maxWidth="xl"
        open={props.open}
        onClose={props.onClose}
        >
        <DialogTitle>
            <Grid className={classes.heading} item xs={12}>
                <LibraryBooksIcon color={"primary"} />
                <span>
                {translate(
                    `app.dosie.other.trainingsForm.${
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
                    location: values.location.value,
                    realizationStatus: values.realizationStatus.value,
                    obuka: obukaFile ? {
                                    encodedFile: obukaFile.encodedFile,
                                    name: obukaFile.name,
                                    size:obukaFile.size,
                                    type: obukaFile.type,
                                    lastModified:  obukaFile.lastModified,
                                } : null,
                    certificate: certificateFile ? {
                                    encodedFile: certificateFile.encodedFile,
                                    name: certificateFile.name,
                                    size:certificateFile.size,
                                    type: certificateFile.type,
                                    lastModified:  certificateFile.lastModified,
                                } : null
                            })}}
            >
                {(formikProps) => (
                    <Form id={"trainingsForm"} autoComplete="off">
                        <DialogContent style={{padding:"4rem"}}>
                        <Grid container spacing={2} justifyContent="center" alignContent="flex-start" className={classes.uploadCompStyles}>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.type !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.type !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="type"
                                label={`${translate("app.dosie.other.trainingsForm.type")} *`}
                                placeholder={translate("app.dosie.other.trainingsForm.type")}
                                getOptionLabel={(option) => option.type}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/typetrainings/search`,
                                        method: "get",
                                        minChar: 1,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.area !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.area !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="area"
                                label={`${translate("app.dosie.other.trainingsForm.area")} *`}
                                placeholder={translate("app.dosie.other.trainingsForm.area")}
                                getOptionLabel={(option) => option.area}
                                getOptionValue={(option) => option.id}
                                component={FAutocomplete}
                                loadOnNoOption={true}
                                    async={{
                                        url: `${properties.api.root}/areatype/search`,
                                        method: "get",
                                        minChar: 1,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.name !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.name !== undefined ? "red" : "initial"
                                }}>
                                <Field
                                name="name"
                                placeholder={`${translate("app.dosie.other.trainingsForm.name")} *`}
                                label={`${translate("app.dosie.other.trainingsForm.name")} *`}
                                component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                name="organizer"
                                placeholder={translate("app.dosie.other.trainingsForm.organizer")}
                                label={translate("app.dosie.other.trainingsForm.organizer")}
                                component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={6} style={{
                                    height: formikProps.errors.location !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.location !== undefined ? "red" : "initial",
                                    marginTop: "1rem"
                                }}>
                                <Field
                                name="location"
                                placeholder={`${translate("app.dosie.other.trainingsForm.location")} *`}
                                label={formikProps.values?.location ? `${translate("app.dosie.other.trainingsForm.location")} *` : ""}
                                component={FAutocomplete}
                                options={locationOptions}
                                />
                             </Grid>
                             <Grid item xs={6} style={{
                                    height: formikProps.errors.realizationStatus !== undefined ? "90px" : "68px",
                                    color: formikProps.errors.realizationStatus !== undefined ? "red" : "initial",
                                    marginTop:"1rem"
                                }}>
                                <Field
                                name="realizationStatus"
                                placeholder={`${translate("app.dosie.other.trainingsForm.realizationStatus")} *`}
                                label={formikProps.values?.realizationStatus ? `${translate("app.dosie.other.trainingsForm.realizationStatus")} *` : ""}
                                component={FAutocomplete}
                                options={realizationStatusOptions}
                                />
                             </Grid>
                             <Grid item xs={6} style={{marginTop:"-1rem"}}>
                                <Field
                                name="dateStart"
                                label={translate("app.dosie.other.trainingsForm.dateStart")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>
                            <Grid item xs={6} style={{marginTop:"-1rem"}}>
                                <Field
                                name="dateEnd"
                                label={translate("app.dosie.other.trainingsForm.dateEnd")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>
                            {formikProps.values.type?.id === "4" &&  
                            <Grid item xs={6}>
                                <Field
                                name="certificateDateFrom"
                                label={translate("app.dosie.other.trainingsForm.certificateDateFrom")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>}
                            {formikProps.values.type?.id === "4" && 
                            <Grid item xs={6}>
                                <Field
                                name="certificateDateTo"
                                label={translate("app.dosie.other.trainingsForm.certificateDateTo")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                            />
                            </Grid>}
                            {formikProps.values.type?.id === "4" && 
                            <Grid item xs={6}>
                                <Field
                                name="datePolaganje"
                                label={translate("app.dosie.other.trainingsForm.datePolaganje")}
                                component={FDatePicker}
                                format={"DD.MM.YYYY"}
                                />
                            </Grid>}
                            <Grid item xs={formikProps.values.type?.id === "4" ? 6 : 12}>
                                <Field
                                name="note"
                                label={translate("app.dosie.other.trainingsForm.notes")}
                                component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            {
                                         !formikProps.values.obuka ? (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {translate("app.dosie.other.trainingsForm.attachTrainings")}
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
                                                                setObukaFile(undefined)
                                                            else{
                                                                setObukaFile({
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
                                                     {translate("app.dosie.other.trainingsForm.attachTrainingsFinal")}
                                                     </Typography>
                                                     <Grid item xs={11} alignItems={"center"} justifyContent={"flex-end"}>
                                                      <Field
                                                      name="obukaName"
                                                      label={translate("app.dosie.other.file")}
                                                      component={FTextField}
                                                      disabled={true}
                                                      size='medium'
                                                      margin='none'
                                                      value={formikProps.values.obukaUrl.substring(0, formikProps.values.obukaUrl.indexOf('-') + 1)}
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
                                                                setObukaFile(undefined)
                                                            else{
                                                                setObukaFile({
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
                                                              operationsTrainings.downloadObukaTrainings(
                                                                formikProps.values.id,
                                                                formikProps.values.obuka.name.substring(0, formikProps.values.obuka.name.indexOf('-')) + (props.item.obukaUrl.slice(props.item.obukaUrl.lastIndexOf('.'))) 
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
                                         !formikProps.values.certificate ? (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}>
                                                    <Typography color="textSecondary" variant="body2">
                                                        {translate("app.dosie.other.trainingsForm.attachCertificate")}
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
                                                                setCertificateFile(undefined)
                                                            else{
                                                                setCertificateFile({
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
                                                     {translate("app.dosie.other.trainingsForm.attachCertificateFinal")}
                                                     </Typography>
                                                     <Grid item xs={11} alignItems={"center"} justifyContent={"flex-end"}>
                                                      <Field
                                                      name="certificateName"
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
                                                                setCertificateFile(undefined)
                                                            else{
                                                              setCertificateFile({
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
                                                              operationsTrainings.downloadCertificateTrainings(
                                                                formikProps.values.id,
                                                                formikProps.values.certificate.name.substring(0, formikProps.values.certificate.name.indexOf('-')) + (props.item.certificateUrl.slice(props.item.certificateUrl.lastIndexOf('.'))) 
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
export default AddTrainingsDialog;