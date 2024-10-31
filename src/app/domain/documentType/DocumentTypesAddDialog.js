import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  DialogContent,
  Grid,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { FTextField, FAutocomplete, FCheckbox } from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { properties } from "../../config/properties";
import * as Yup from "yup";
import AlertDialog from "../../util/alert/AlertDialog";
import operations from "./duck/operations";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`app-${index}`}
      aria-labelledby={`app-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const useStyles = makeStyles ((theme) => ({
  addRoleFontSize: {
    fontSize: 14,
  },
}));

const a11yProps = (index) => {
  return {
    id: `app-${index}`,
    "aria-controls": `app-${index}`,
  };
};

export default function DocumentTypesDialog(props) {
  const theme = useTheme();
const classes = useStyles();
  // const [tab, setTab] = React.useState(props.item.roleId ? 1 : 0);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const { documentTypes } = useSelector((state) => ({
    documentTypes: state.documentTypes.documentTypes,
  }));
  const username = useSelector(
    (state) => state.oidc.user?.profile.preferred_username
  );
  const dispatch = useDispatch();
  // const handleTabChange = (event, newValue) => {
  //     setTab(newValue);
  // };
  // const validationSchema = Yup.object().shape({
  //     name: Yup.string()
  //         .matches(/^[a-zA-Z0-9_]+$/, translate("app.notifications.errorSign"))
  //         .max(120, translate("app.notifications.maxLength120"))
  //         .required(translate("app.notifications.errorRequired")),
  //     appName:
  //         tab === 1
  //             ? Yup.string().notRequired().nullable()
  //             : Yup.string()
  //                 .matches(/^[a-zA-Z0-9_]+$/, translate("app.notifications.errorSign"))
  //                 .max(120, translate("app.notifications.maxLength120"))
  //                 .required(translate("app.notifications.errorRequired")),
  //     description: Yup.string()
  //         .max(240, translate("app.notifications.maxLength240"))
  //         .strict().trim(translate("app.notifications.trim"))
  //         .nullable(),
  //     appLongName: Yup.string()
  //         .max(120, translate("app.notifications.maxLength120"))
  //         .strict().trim(translate("app.notifications.trim"))
  //         .nullable(),
  //     appDesc:  Yup.string()
  //         .max(240, translate("app.notifications.maxLength240"))
  //         .strict().trim(translate("app.notifications.trim"))
  //         .nullable(),
  // });
  return (
    <>
      <Dialog
        id={props.id ? props.id : "documentTypesAddDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
      >
        <DialogTitle> {translate(`app.documentTypes.${props.id}`)}</DialogTitle>
        <Formik
          enableReinitialize
          initialValues={{ ...props.item }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            if (username)
              values = { ...values, createdBy: username };;
            setOpenAlertDialog(values);
          }}
        >
          {(formikProps) => (
            <Form id={"workPosTypesDialogForm"} autoComplete="off" noValidate>
              <DialogContent>
                <Container className={classes.addRoleFontSize}>
                  <Grid container spacing={24} xs={12}>
                    <Grid item xs={12}>
                      <Field
                        required
                        name="docType"
                        label={translate("app.documentTypes.table.name")}
                        component={FTextField}
                      />
                    </Grid>
                    <br />
                  </Grid>
                </Container>
              </DialogContent>

              <DialogActions>
                <Button color="primary" type="submit">
                  {translate("app.generic.save")}
                </Button>
                <Button color="secondary" onClick={props.onClose}>
                  {translate("app.generic.cancel")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {openAlertDialog && (
        <AlertDialog
          id={"documentTypesAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(values) => {
            documentTypes
              ? props.save(values)
              : dispatch(operations.fetchDocumentTypes({})).then(() => {
                  props.save(values);
                });
          }}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </>
  );
}
