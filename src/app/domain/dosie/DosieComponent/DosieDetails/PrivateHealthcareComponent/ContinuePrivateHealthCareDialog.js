import React, {useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import {
  FTextField,
  FDatePicker,
} from "asseco-commons";
import { translate } from "../../../../../util/lang/translate-wrapper";
import * as Yup from "yup";
import AlertDialog from "../../../../../util/alert/AlertDialog";


export default function ContinuePrivateHealthCareDialog(props) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const initialValues = {};

  const validationSchema = Yup.object().shape({
      company: Yup.string()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
      dateFrom: Yup.date()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
      dateTo: Yup.mixed()
        .nullable()
        .test('dateFrom', translate("app.dosie.rolesPositionInfoForm.unvalidDate"), function (value) {
          const {dateFrom} = this.parent;
          return new Date(value) >= new Date(dateFrom)
        }),
  });
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>
          {translate(
            `app.family.buttonContinue.titleForm`
          )}
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.dosie = values.dosie ? values.dosie : props.dosie;
            setOpenAlertDialog(values);
          }}
        >
          {(formikProps) => (
            <Form
              autoComplete="off"
              noValidate
            >
              <DialogContent>
                <Container>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Field
                        name="company"
                        label={`${translate("app.dosie.privateHealthcare.company")} *`}
                        component={FTextField}
                      />
                    </Grid>
                    <Grid item xs={6}  style={{marginBottom: formikProps.errors.dateFrom ? "-1.5rem" : "0"}}>
                      <Field
                        required
                        name="dateFrom"
                        label={translate("app.dosie.privateHealthcare.datumOd")}
                        component={FDatePicker}
                      />
                    </Grid>
                    <Grid item xs={6} >
                      <Field
                        name="dateTo"
                        label={translate("app.dosie.privateHealthcare.datumDo")}
                        component={FDatePicker}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </DialogContent>
              <DialogActions>
                <Button color="secondary" variant="outlined" type="submit">
                  {translate("app.family.buttonContinue.save")}
                </Button>
                <Button color="secondary" variant="outlined" onClick={props.onClose}>
                  {translate("app.generic.cancel")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {openAlertDialog && (
        <AlertDialog
          id={"privateHealthcareAddEditAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onCloseYes={() => setOpenAlertDialog(false)}
          onClose={() => setOpenAlertDialog(false)}
          onFunction={props.save}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </>
  );
}
