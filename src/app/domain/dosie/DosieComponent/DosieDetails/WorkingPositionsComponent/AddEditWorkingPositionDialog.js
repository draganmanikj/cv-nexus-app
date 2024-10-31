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
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
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
import { statusOptions } from "../../../../../util/enum/statusEnum";


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
export default function WorkingPositionTypesAddDialog(props) {
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();
  const { workingPositions } = useSelector((state) => state.dosie);
  const initialValues = { ...props.item };

  const validationSchema = Yup.object().shape({
    workingPositionType: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
      dateFrom: Yup.date()
      .required(translate("app.notifications.errorRequired"))
      .nullable()
      .test('dateFrom', translate("app.dosie.workingPositions.unvalidDate"), function (value) {
        const elements = workingPositions || [];
  
        const parsedElements = elements.map(element => ({
          ...element,
          dateFrom: element.dateFrom ? new Date(element.dateFrom) : null,
          dateTo: element.dateTo ? new Date(element.dateTo) : null,
        }));
        console.log("parsedElements", parsedElements)
        const newestDateTo = parsedElements.reduce((maxDate, element) => {
          // return element.dateTo && element.dateTo > maxDate ? element.dateTo : maxDate;
          return element.dateTo;
        }, new Date(0));
        console.log("newestDateTo", newestDateTo) // posledniot datumDo
        const latestDateFrom = parsedElements.reduce((latestDate, element) => {
          // return element.dateFrom > latestDate ? element.dateFrom : latestDate;
          return element.dateFrom;
        }, new Date(0));
        console.log("latestDateFrom", latestDateFrom) //posledniot DatumOd
        if ((value > latestDateFrom) && (value < newestDateTo )) {
          return this.createError({
            path: 'dateFrom',
            message: translate("app.dosie.workingPositions.unvalidDate"),
          });
        }
        console.log("value", value)
  
        return value;
      }),
  
    dateTo: Yup.mixed()
      .nullable()
      .test('dateFrom', translate("app.dosie.workingPositions.unvalidDate"), function (value) {
        // const elements = workingPositions || [];
  
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
        // const elements = workingPositions || [];
  
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
        //     message: translate("app.dosie.workingPositions.unvalidDate"),
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
        id={"workingPositionsAddEditDialog"}
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>
          {translate(
            `app.dosie.workingPositions.${
              props.item.id ? "editTitle" : "addTitle"
            }`
          )}
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.dosie = values.dosie ? values.dosie : props.dosie;

            if (workingPositions === undefined || workingPositions === null)
              dispatch(actions.emptyList());

            props.save(values);
            // if (props.item && props.item.id)
            //     values.id = props.item.id;
            // setOpenAlertDialog({ ...values, active: true });
          }}
        >
          {(formikProps) => (
            <Form
              id={"workingPositionsAddEditDialogForm"}
              autoComplete="off"
              noValidate
            >
              <DialogContent>
                <Container>
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                      <Field
                        name="company"
                        label={translate("app.dosie.workingPositions.company")}
                        component={FTextField}
                      />
                    </Grid>
                    <Grid item xs={6} 
                                  style={{marginBottom: formikProps.errors.workingPositionType ? "-1.25rem" : "0rem",
                                  marginTop: formikProps.values.workingPositionType ? "-2.4rem" : "0.5rem"}}>
                      <Field
                        required
                        name="workingPositionType"
                        label={!formikProps.values.workingPositionType ? undefined : translate("app.dosie.workingPositions.workingPositionType")}
                        placeholder={`${translate("app.dosie.workingPositions.workingPositionType")}`}
                        component={FAutocomplete}
                        loadOnNoOptions
                        cacheOptions={false}
                        async={{
                          url: `${properties.api.root}/workingPositionType/filter`,
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
                        label={translate("app.dosie.workingPositions.datumOd")}
                        component={FDatePicker}
                      />
                    </Grid>
                    <Grid item xs={6} >
                      <Field
                        name="dateTo"
                        label={translate("app.dosie.workingPositions.datumDo")}
                        component={FDatePicker}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: formikProps.errors.dateFrom ? "-1.5rem" : "0"}}>
                      <Field
                        name="status"
                        label={`${translate("app.dosie.workingPositions.status")} *`}
                        component={FSelect}
                        options={statusOptions}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"0.5rem"}}>
                        <Field
                          name="activities"
                          label={translate("app.dosie.workingPositions.activities")}
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
          id={"workingPositionsAddEditAlertDialog"}
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