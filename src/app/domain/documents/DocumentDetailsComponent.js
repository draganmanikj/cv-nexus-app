import React from "react";
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
import { translate } from "../../util/lang/translate-wrapper";
import { FTextField, FAutocomplete } from "asseco-commons";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";

const useStyles = makeStyles (() => {});

export default function DocumentDetailsComponent(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();

  return (
    <Dialog
      id={"documentsDetailsDialog"}
      fullWidth={true}
      maxWidth="md"
      open={props.open}
    >
      <DialogTitle> {translate("app.documents.add")}</DialogTitle>
      <Formik
        initialValues={{}}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          props.save(values);
        }}
      >
        {(formikProps) => (
          <Form id={"documentsDetailsDialogForm"} autoComplete="off">
            <DialogContent>
              <Container className={classes.addRoleFontSize}>
                <Grid container spacing={24} xs={12}>
                  <Grid item xs={12}>
                    <Field
                      disabled={true}
                      name="description"
                      //value={props.row.name}
                      label={translate("app.roles.form.roleName")}
                      component={FTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      disabled={true}
                      name="documentUrl"
                      label={translate("app.roles.form.app")}
                      //value={props.row.application.name}
                      component={FTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      disabled={true}
                      name="version"
                      label={translate("app.roles.form.app")}
                      //value={props.row.application.name}
                      component={FTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      disabled={true}
                      name="status"
                      label={translate("app.roles.form.app")}
                      //value={props.row.application.name}
                      component={FTextField}
                    />
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={props.onClose}>
                {translate("app.roles.close")}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
