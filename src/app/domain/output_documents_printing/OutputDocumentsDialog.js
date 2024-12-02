import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  DialogContent,
  Grid,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import { GetApp } from "@mui/icons-material";
import {
  FTextField,
  FAutocomplete,
  FUploadField,
} from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { properties } from "../../config/properties";
import * as Yup from "yup";
import operations from "./duck/operations";
import actions from "./duck/actions";
import { createTheme } from '@mui/material';
import { ThemeProvider } from "@mui/styles";
import Typography from "@mui/material/Typography";
import SQLEditor from "./util/SQLEditor";
import wordGenerationOperations from "../wordUtils/duck/operations";
import * as yup from "yup";
import { FilePond } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginGetFile from "filepond-plugin-get-file";
import * as FilePondTool from "filepond";
import commonsConfiguration from "asseco-commons/dist/CommonsConfiguration";

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      input: {},
    },
    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 10px) scale(1)",
        marginTop: "20px",
      },
    },
    MuiTextField: {
      root: {
        width: 380,
        margin: "5px",
      },
    },
    MuiField: {
      root: {
        width: 380,
        margin: "5px",
      },
    },
    MuiDatePicker: {
      root: {
        width: 20,
      },
    },
  },
});

const useStyles = makeStyles ((theme) => ({
  // root: {
  border: "1px solid rgba(0, 0, 0, .125)",
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&$expanded": {
    margin: "auto",
  },
  uploadCompStyles: {
    "& .filepond--root":{
      marginBottom: 0
    },
    "& .filepond--credits": {
      display: "none !important",
    },
  },
  // },
  // expanded: {},
}));

FilePondTool.registerPlugin(FilePondPluginFileValidateType);
FilePondTool.registerPlugin(FilePondPluginFileEncode);
FilePondTool.registerPlugin(FilePondPluginGetFile);

export default function OutputDocumentsDialog(props) {
  const theme = useTheme();
const classes = useStyles();
  const dispatch = useDispatch();
  const { open, loading, onClose } = props;
  // const [add, setAdd] = useState(props.add);
  // const [edit, setEdit] = useState(props.edit);
  const [initialValues, setInitialValues] = useState(open);
  const [sqlParams, setSqlParams] = useState([]);
  const [mainFormDirty, setMainFormDirty] = useState(false);
  const [yupSchema, setYupSchema] = useState(false);
  const [uploadWithForm, setUploadWithForm] = useState(undefined);
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
    templateType: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
  });

  useEffect(() => {
    if (initialValues.id) {
      dispatch(operations.getParametersForSql(initialValues.id))
      .then(resList => {
          if (resList instanceof Array && resList.length > 0) {
            setSqlParams(resList);
            const tempValiations = createValidations(resList);
            const yepSchema = tempValiations.reduce(createYupSchema, {});
            setYupSchema(yup.object().shape(yepSchema));
          }
        }
      );
    }
  }, []);

  const createValidations = (resList) => {
    const arr = resList.map((element) => {
      return {
        id: element,
        label: element,
        validationType: "string",
        type: "required",
        validations: [
          {
            type: "required",
            params: [translate("app.notifications.errorRequired")],
          },
        ],
      };
    });
    return arr;
  };

  const createYupSchema = (schema, config) => {
    const { id, validationType, validations = [] } = config;
    if (!yup[validationType]) {
      return schema;
    }
    let validator = yup[validationType]();
    validations.forEach((validation) => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
    });
    schema[id] = validator;
    return schema;
  };

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

  const [uploadedFileArray, setUploadedFileArray] = useState(checkUploadedFile(initialValues));

  return (
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          {" "}
          {translate(`app.generic.${props.id ? 'edit' : 'add'}`)}
        </DialogTitle>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values.id) {
              props.updateDocument(values, onClose)
            } else {
              //TODO: Check: 1. If a file has beeen uploaded, 2. If the sql is empty, prompt a confirm if any are true
              props.saveDocument({
                  ...values,
                  file: uploadWithForm,
                }, onClose)
            }
          }}
        >
          {(formikProps) => {
            setMainFormDirty(formikProps.dirty);
            return (
              <Form
                id={"zdravstveniPreglediDialog"}
                autoComplete="off"
                noValidate
              >
                <ThemeProvider theme={theme}>
                  <DialogContent>
                    <Container className={classes.uploadCompStyles}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            name="name"
                            label={translate('app.requestOptions.description')}
                            required
                            component={FTextField}
                            size='small'
                            margin='none'
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="templateType"
                            label={translate('app.drawer.outputDocumentType')}
                            component={FAutocomplete}
                            options={props.documentTypes}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.naziv}
                            size='small'
                            margin='none'
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="templatePath"
                            label="Фајл"
                            component={FTextField}
                            disabled={true}
                            size='small'
                            margin='none'
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {formikProps.values?.id === undefined ? (
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
                                      url: `${properties.api.root}/templates/upload/${formikProps.values.id}`,
                                      method: "PUT",
                                      headers: {
                                        Authorization: `Bearer ${commonsConfiguration.getToken()}`,
                                      },
                                    },
                                  }}
                                  onprocessfile={(error, fileProp) => {
                                    if (error)
                                      dispatch(actions.changeDocumentPrintUrlFail({}));
                                    if (!error) {
                                      const file = fileProp.file;
                                      const newFileArr = checkUploadedFile({
                                        file: file,
                                      });
                                      dispatch(
                                        operations.updateTemplatePath(
                                          formikProps.values.id,
                                          file.name,
                                          file
                                        )
                                      )
                                      dispatch(actions.changeDocumentPrintUrlSuccess({}));
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
                                        wordGenerationOperations.downloadFileForTemplate(
                                          formikProps.values.id,
                                          formikProps.values.name + ".docx"
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
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            color="textSecondary"
                            display="block"
                            variant="caption"
                          >
                            {"SQL Уредувач"}
                          </Typography>
                          <SQLEditor
                            SQLQuery={initialValues?.sql}
                            onChange={(value) => {
                              formikProps.setFieldValue("sql", value);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Container>
                  </DialogContent>
                </ThemeProvider>
                <DialogActions>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={!formikProps.dirty || !formikProps.isValid}
                    variant="contained"
                  >
                    {translate("app.generic.save")}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={onClose}
                    variant="contained"
                  >
                    {translate("app.generic.cancel")}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
        {sqlParams && sqlParams.length > 0 && yupSchema &&
          <div className={classes.root} style={{ marginBottom: "30px" }}>
            <DialogContent>
              <Container>
                <Accordion disabled={mainFormDirty}>
                  <AccordionSummary
                    style={{
                      backgroundColor: "rgba(0, 0, 0, .03)",
                    }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {"Тестирање"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Formik
                      initialValues={{}}
                      isInitialValid={false}
                      validateOnChange={true}
                      validationSchema={yupSchema}
                      onSubmit={(values) => {
                        dispatch(
                          wordGenerationOperations.generateTemplateOp(
                            { ...initialValues },
                            values
                          )
                        )
                      }}
                    >
                      {(formikProps) => {
                        return (
                          <Form
                            id={"zdravstveniPreglediDialog"}
                            autoComplete="off"
                            noValidate
                          >
                            {/*TESTESTADGFADSTADGFADGFTESTESTDGFTESTTESTESTADGFAFTESTEESTESTADGFADGadfadfadfadfadf*/}
                            <ThemeProvider theme={theme}>
                              <Grid
                                container
                                xs={12}
                                sm={12}
                                justifyContent="flex-end"
                              >
                                <Grid item xs={12} sm={12}>
                                  <Button
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"secondary"}
                                    disabled={
                                      formikProps.isValid === false
                                        ? true
                                        : mainFormDirty
                                    }
                                    size={"medium"}
                                    // fullWidth={true}
                                  >
                                    Тестирај
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={24}
                                xs={12}
                                justifyContent={"flex-start"}
                              >
                                {sqlParams && sqlParams.length > 0 &&
                                  <div style={{ marginTop: "10px" }}>
                                    <Grid container xs={12} sm={12}>
                                      <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        justifyContent="flex-end"
                                        style={{
                                          positon: "absolute",
                                          left: "40px",
                                        }}
                                      ></Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                      {sqlParams.map((param, key) => (
                                        <Grid item xs={3}>
                                          <Field
                                            name={param}
                                            label={param}
                                            component={FTextField}
                                            disabled={mainFormDirty}
                                            required
                                          />
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </div>
                                }
                              </Grid>
                            </ThemeProvider>
                          </Form>
                        )
                      }}
                    </Formik>
                  </AccordionDetails>
                </Accordion>
              </Container>
            </DialogContent>
          </div>
        }
      </Dialog>
  );
}
