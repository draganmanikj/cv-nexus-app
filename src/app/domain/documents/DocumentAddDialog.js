import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  DialogContent,
  Grid,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import {
  FAutocomplete,
  FTextField,
  FUploadField,
} from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { properties } from "../../config/properties";
import AlertDialog from "../../util/alert/AlertDialog";
import operations from "./duck/operations";
import { FilePond } from "react-filepond";
import "./styles/custom-filepond.css";
import { GetApp } from "@mui/icons-material";
import commonsConfiguration from "asseco-commons/dist/CommonsConfiguration";
import actions from "./duck/actions";
import DescriptionIcon from '@mui/icons-material/Description';
import * as Yup from 'yup';

const useStyles = makeStyles ((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  upload: {
    marginTop: theme.spacing(2),
  },
  docTypeGridItm: {
    border: "1px solid lightgray",
    padding: "1rem",
    borderRadius: "0.25rem",
    marginBottom: "1rem"
  },
  uploadCompStyles: {
    "& .filepond--root":{
      marginBottom: 0
    },
    "& .filepond--credits": {
      display: "none !important",
    },
  },
  downloadBtnGridItm:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function DocumentAddDialog(props) {
  const theme = useTheme()
  const custom = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [uploadWithForm, setUploadWithForm] = useState(undefined);
  const initialValues = {...props.item}
  const dispatch = useDispatch();
  const { dosie, item } = props;
  const validationSchema = Yup.object().shape({
    docType: Yup.mixed()
    .required(translate("app.notifications.errorRequired"))
    .nullable(),
  });

  const checkUploadedFile = (formData) => {
    if (formData && formData.file) {
      return [
        {
          options: {
            type: "local", // indicates an already uploaded file

            // mock file information
            file: {
              name: formData.file.name,
              size: formData.file.size,
              type: formData.file.type,
            },
            metadata: {
              url: "formData.file.templatePath",
            },
          },
        },
      ];
    } else return [];
  };
  const [uploadedFileArray, setUploadedFileArray] = useState(
    checkUploadedFile(initialValues)
  );

  if (item === undefined) return <></>;
  return (
    <>
      <Dialog
        id={props.id ? props.id : "documentsDialog"}
        fullWidth={true}
        maxWidth="sm"
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>
          {translate(
            `app.documents.${item.id ? "replaceDocument" : "addDocument"}`
          )}
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          isInitialValid={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setOpenAlertDialog({...values, file: uploadWithForm, dosie})
          }}
        >
          {(formikProps) => (
            <Form id="addDocumentForm" autoComplete="off" noValidate>
              <DialogContent>
                <Grid container >
                  <Grid item xs={12} className={custom.docTypeGridItm}>
                    <Field
                      name="docType"
                      component={FAutocomplete}
                      label={formikProps.values.docType ? translate("app.documentTypes.table.name"): ""}
                      placeholder={translate("app.documentTypes.table.name")}
                      loadOnNoOptions={true}
                      async={{
                        url: `${properties.api.root}/documentType/filter/active`,
                        method: "get",
                        minChar: 2,
                      }}
                      cacheOptions={false}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.docType}
                      size="large"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  {!formikProps.values.file === undefined ? (
                            <Grid item xs={12} sm={12}>
                              <Field
                                acceptedFileTypes={[
                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                ]}
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
                                  if (error !== null)
                                    setUploadWithForm(undefined);
                                  else {
                                    setUploadWithForm({
                                      encodedFile:
                                        file.getFileEncodeBase64String(),
                                      name: file.file.name,
                                      size: file.file.size,
                                      type: file.file.type,
                                      lastModified: file.lastModified,
                                    });
                                  }
                                }}
                              />
                            </Grid>
                          ) : (
                            <Grid
                              container
                              xs={12}
                              sm={12}
                              style={{ marginTop: "10px" }}
                              className={custom.uploadCompStyles}
                            >
                              <Grid
                                item
                                xs={uploadedFileArray.length > 0 ? 10 : 12}
                              >
                                <FilePond
                                  name="file"
                                  allowBrowse={true}
                                  allowRemove={true}
                                  allowProcess={true}
                                  allowMultiple={false}
                                  maxFiles={1}
                                  files={uploadedFileArray}
                                  chunkUploads={true}
                                  labelButtonDownloadItem={"custom label"} // by default 'Download file'
                                  allowDownloadByUrl={true} // by default downloading by URL disabled
                                  // component={FUploadField}
                                  labelIdle={`${translate(
                                    "app.generic.dragAndDropDocument"
                                  )} <span class="filepond--label-action"> ${translate(
                                    "app.generic.browseDocument"
                                  )} </span>`}
                                  server={{
                                    process: {
                                      url: `${properties.api.root}/documentoptions/upload/${formikProps.values.id}`,
                                      method: "PUT",
                                      headers: {
                                        Authorization: `Bearer ${commonsConfiguration.getToken()}`,
                                      },
                                    },
                                  }}
                                  onprocessfile={(error, fileProp) => {
                                    if (error)
                                      dispatch(actions.changeDocUrlFail({}));
                                    if (!error) {
                                      const file = fileProp.file;
                                      const newFileArr = checkUploadedFile({
                                        file: file,
                                      });
                                      dispatch(
                                        operations.updateDocumentUrl(
                                          formikProps.values.id,
                                          file.name,
                                          file
                                        )
                                      )
                                      dispatch(actions.changeDocUrlSuccess({}));
                                      setUploadedFileArray(newFileArr);
                                    }
                                  }}
                                />
                              </Grid>
                              {uploadedFileArray.length > 0 && (
                                <Grid
                                  item
                                  xs={2}
                                  sm={2}
                                  alignItems={"center"}
                                  justifyContent={"flex-end"}
                                  style={{ paddingLeft: "40px" }}
                                >
                                  <IconButton
                                    variant={"contained"}
                                    fullWidth={true}
                                    size="large"
                                    color="secondary"
                                    onClick={() => {
                                      dispatch(
                                        operations.downloadDocumentForTemplate(
                                          formikProps.values.id,
                                          formikProps.values.file.name + ".docx"
                                        )
                                      );
                                    }}
                                  >
                                    <GetApp fontSize="large" />
                                  </IconButton>
                                  {translate("app.generic.download")}
                                </Grid>
                              )}
                            </Grid>
                          )}
                  <Grid item xs={12}>
                    <Field
                      multiline
                      rows={6}
                      name="description"
                      label={translate("app.documents.form.description")}
                      component={FTextField}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!uploadedFileArray}
                >
                  {translate("app.documents.form.submit")}
                </Button>
                <Button
                  color="secondary"
                  onClick={props.onClose}
                >
                  {translate("app.generic.cancel")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {openAlertDialog && (
            <AlertDialog
            open={openAlertDialog}
            item={openAlertDialog}
            onClose={() => setOpenAlertDialog(false)}
            onCloseYes={() => setOpenAlertDialog(false)}
            onFunction={(values) => {props.save(values)}}
            text={translate("app.notifications.saveConfirm")}
            />
      )}
    </>
  );
}
