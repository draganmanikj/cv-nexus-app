import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import {
  FAutocomplete,
  FSelect,
  FTextField,
  FDatePicker,
} from "asseco-commons";
import { translate } from "../../../../../util/lang/translate-wrapper";
import * as Yup from "yup";
import AlertDialog from "../../../../../util/alert/AlertDialog";
import { properties } from "../../../../../config/properties";
import actions from "./duck/actions";
import {statusOptions}  from "../../../../../util/enum/statusEnum";


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
}))
export default function AddEditRolesPositionDialog(props) {
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();
  const { rolesPositions } = useSelector((state) => state.dosie);
  const initialValues = { ...props.item };

  const validationSchema = Yup.object().shape({
    rolePositionType: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
      dateFrom: Yup.date()
      .required(translate("app.notifications.errorRequired"))
      .nullable()
      .test('dateFrom', translate("app.dosie.rolesPositionInfoForm.unvalidDate"), function (value) {
        const elements = rolesPositions || [];
  
        const parsedElements = elements.map(element => ({
          ...element,
          dateFrom: element.dateFrom ? new Date(element.dateFrom) : null,
          dateTo: element.dateTo ? new Date(element.dateTo) : null,
        }));
        const newestDateTo = parsedElements.reduce((maxDate, element) => {
          return element.dateTo;
        }, new Date(0));
        const latestDateFrom = parsedElements.reduce((latestDate, element) => {
          return element.dateFrom;
        }, new Date(0));
        if ((value > latestDateFrom) && (value < newestDateTo )) {
          return this.createError({
            path: 'dateFrom',
            message: translate("app.dosie.rolesPositionInfoForm.unvalidDate"),
          });
        }
  
        return value;
      }),
  
    dateTo: Yup.mixed()
      .nullable()
      .test('dateFrom', translate("app.dosie.rolesPositionInfoForm.unvalidDate"), function (value) {
        // const elements = rolesPositions || [];
  
        // const parsedElements = elements.map(element => ({
        //   ...element,
        //   dateFrom: new Date(element.dateFrom),
        //   dateTo: element.dateTo ? new Date(element.dateTo) : null,
        // }));
  
        // const newestDateTo = parsedElements.reduce((maxDate, element) => {
        //   return element.dateTo && element.dateTo > maxDate ? element.dateTo : maxDate;
        // }, new Date(0));

        // if (value) {
        //   return value > newestDateTo;
        // }

        // return true;
        // const elements = rolesPositions || [];
  
        // const parsedElements = elements.map(element => ({
        //   ...element,
        //   dateFrom: element.dateFrom ? new Date(element.dateFrom) : null,
        //   dateTo: element.dateTo ? new Date(element.dateTo) : null,
        // }));
        // const newestDateTo = parsedElements.reduce((maxDate, element) => {
        //   return element.dateTo;
        // }, new Date(0));
        // const latestDateFrom = parsedElements.reduce((latestDate, element) => {
        //   return element.dateFrom;
        // }, new Date(0));
        // if ((value > latestDateFrom) && (value < newestDateTo )) {
        //   return this.createError({
        //     path: 'dateFrom',
        //     message: translate("app.dosie.rolesPositions.unvalidDate"),
        //   });
        // }
        const {dateFrom} = this.parent;
        if (value === undefined || value === null) {
          return true;
        }
        return new Date(value) >= new Date(dateFrom)
      }),
    status: Yup.string()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
  });
  return (
    <>
      <Dialog
        id={"rolesPositionsAddEditDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>
          {translate(
            `app.dosie.rolesPositionInfoForm.${
              props.item.id ? "editTitle" : "addTitle"
            }`
          )}
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.dosie = values.dosie ? values.dosie : props.dosie;
            props.save(values);
            // if (props.item && props.item.id)
            //     values.id = props.item.id;
            // setOpenAlertDialog({ ...values, active: true });
          }}
        >
          {(formikProps) => (
            <Form
              id={"rolesPositionsAddEditDialogForm"}
              autoComplete="off"
              noValidate
            >
              <DialogContent>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={12} 
                                  style={{marginBottom: formikProps.errors.rolePositionType ? "-1.25rem" : "0rem",
                                  marginTop: formikProps.values.rolePositionType ? "-2.4rem" : "0.5rem"}}>
                      <Field
                        required
                        name="rolePositionType"
                        label={!formikProps.values.rolePositionType ? undefined : translate("app.dosie.rolesPositionInfoForm.rolePositionType")}
                        placeholder={`${translate("app.dosie.rolesPositionInfoForm.rolePositionType")}`}
                        component={FAutocomplete}
                        loadOnNoOptions
                        cacheOptions={false}
                        async={{
                          url: `${properties.api.root}/rolesPositionTypes`,
                          method: "get",
                          minChar: 2,
                        }}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) =>
                          `${option.name} (${option.nameMk})`
                        }
                      />
                    </Grid>
                    <Grid item xs={6}  style={{marginBottom: formikProps.errors.dateFrom ? "-1.5rem" : "0"}}>
                      <Field
                        required
                        name="dateFrom"
                        label={translate("app.dosie.rolesPositionInfoForm.datumOd")}
                        component={FDatePicker}
                      />
                    </Grid>
                    <Grid item xs={6} >
                      <Field
                        name="dateTo"
                        label={translate("app.dosie.rolesPositionInfoForm.datumDo")}
                        component={FDatePicker}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: formikProps.errors.dateFrom ? "-1.5rem" : "0"}}>
                      <Field
                        name="status"
                        label={`${translate("app.dosie.rolesPositionInfoForm.status")} *`}
                        component={FSelect}
                        options={statusOptions}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"0.5rem"}}>
                        <Field
                          name="activities"
                          label={translate("app.dosie.rolesPositionInfoForm.activities")}
                          component={FTextField}
                          variant="outlined"
                          rows={8}
                          multiline
                        />
                      </Grid>
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
          id={"rolesPositionsAddEditAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onCloseYes={() => setOpenAlertDialog(false)}
          onClose={() => setOpenAlertDialog(false)}
          // onFunction={props.save}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </>
  );
}
