import React, {useState} from "react";
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

const useStyles = makeStyles ((theme) => ({
  addRoleFontSize: {
    fontSize: 14,
  },
}));


export default function DocumentTypesDialog(props) {
  const theme = useTheme();
const classes = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const username = useSelector(
    (state) => state.oidc.user?.profile.preferred_username
  );

  const validationSchema = Yup.object().shape({
      language: Yup.string()
          .required(translate("app.notifications.errorRequired"))
          .nullable(),
  });
  return (
    <>
      <Dialog
        id={props.id ? props.id : "languagesTypesAddDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
      >
        <DialogTitle> {translate(`app.languagesTypes.${props.id}`)}</DialogTitle>
        <Formik
          enableReinitialize
          initialValues={{ ...props.item }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setOpenAlertDialog(values);
          }}
        >
          {(formikProps) => (
            <Form autoComplete="off" noValidate>
              <DialogContent>
                <Container className={classes.addRoleFontSize}>
                  <Grid container spacing={24} xs={12}>
                    <Grid item xs={12}>
                      <Field
                        required
                        name="language"
                        label={translate("app.languagesTypes.language")}
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
          id={"languagesTypesAlertDialog"}
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
