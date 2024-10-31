import React, { useState, useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { translate } from "../../../../util/lang/translate-wrapper";
import { FDatePicker, FTextField } from "asseco-commons";
import { dosieEditFormStyles } from "../DosieComponentStyle";
import AlertDialog from "../../../../util/alert/AlertDialog";
import operations from "./WorkingPositionsComponent/duck/operations";
import operationsRoles from "./RolesPositionsComponent/duck/operations"
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

const useStyles = makeStyles ((theme) => ({
  flexGridItm: {
      display: "flex !important",
      alignItems: "flex-end !important",
    },
    inputBig:{
      marginTop:"3rem",
    },
}))

export default function DosieWorkInfoComponent(props) {
  const { dosie, isAddDosie } = props;
  const dispatch = useDispatch();
  const classes = dosieEditFormStyles();
  const themeItems = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [workPosition, setWorkPosition] = useState({});
  const { workingPositions } = useSelector((state) => state.dosie);
  const [initialValues, setInitialValues] = useState()
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const isAdmin = userGroups.includes("admins");
  const prevDosieIdRef = useRef();

  useEffect(() => {
    if (dosie?.id !== prevDosieIdRef.current) {
      dispatch(operations.fetchWorkingPositionsById(dosie.id));
      dispatch(operationsRoles.fetchRolesPositionsById(dosie.id));
    }
  
    if (workingPositions && workingPositions.length > 0) {
      const currentWorkingPosition = workingPositions.find(
        (position) => position.status === 1 && position.flag === 1
      );
  
      setInitialValues({
        ...dosie,
        workingPositionType: currentWorkingPosition?.workingPositionType.name || null,
        dateEmployee: currentWorkingPosition?.dateFrom
      });
    } else {
      setInitialValues({
        workingPositionType: null,
        dateEmployee: null,
        ...dosie,
      });
    }
    prevDosieIdRef.current = dosie?.id;
  }, [dosie, workingPositions, isAddDosie]);
  

  return (
    <div className={classes.root}>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        isInitialValid={false}
        onSubmit={(values) => {
          setOpenAlertDialog({ ...values });
        }}
      >
        {(formikProps) => (
          <Form id={"dosieWorkInfoEditForm"} autoComplete="off">
            <Grid container spacing={2} justifyContent="flex-end" className={themeItems.root}>
              <Button
                style={{ marginRight: "5px" }}
                color="primary"
                variant="outlined"
                type="submit"
                disabled={!formikProps.isValid}
              >
                {translate("app.generic.save")}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                type="reset"
                disabled={!formikProps.isValid}
              >
                {translate("app.generic.cancel")}
              </Button>
            </Grid>

            <Grid container spacing={2} justifyContent="center" alignContent="flex-start">
              <Grid item xs={4} className={themeItems.flexGridItm}>
                  <Field
                    name="navision_no"
                    label={translate(
                      "app.dosie.dosieWorkInfoForm.navision"
                    )}
                    component={FTextField}
                    required
                    disabled={ isAdmin ? false : true }
                  />
              </Grid>
              <Grid item xs={4} className={themeItems.flexGridItm}>
                  <Field
                    name="position_no"
                    label={translate(
                      "app.dosie.dosieWorkInfoForm.position"
                    )}
                    component={FTextField}
                    required
                    disabled={ isAdmin ? false : true }
                  />
              </Grid>
              <Grid item xs={4} className={themeItems.flexGridItm}>
                  <Field
                    name="tagetik_no"
                    label={translate(
                      "app.dosie.dosieWorkInfoForm.tagetik"
                    )}
                    component={FTextField}
                    required
                    disabled={ isAdmin ? false : true }
                  />
              </Grid>
              <Grid item xs={6} className={themeItems.flexGridItm}>
                <Field
                  name="workingPositionType"
                  component={FTextField}
                  disabled={true}
                  label={translate(
                    "app.dosie.dosieWorkInfoForm.workingPosition"
                  )}
                  fullWidth
                  value={workingPositions?.length > 0 ? workingPositions[0].workingPositionType?.name : ''}
                />
              </Grid>
              <Grid item xs={6} className={themeItems.flexGridItm}>
                <Field
                  name="dateEmployee"
                  label={translate(
                    "app.dosie.dosieWorkInfoForm.dateEmployee"
                  )}
                  component={FDatePicker}
                  format={"DD.MM.YYYY"}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="body2">{`${translate("app.dosie.dosieWorkInfoForm.organizationalSkills")} :`}</Typography>
              </Grid>
              <Grid item xs={12} className={`${themeItems.flexGridItm} ${themeItems.inputBig}`}>
                        <Field
                          name="organizationalSkills"
                          component={FTextField}
                          variant="outlined"
                          rows={5}
                          multiline
                        />
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="body2">{`${translate("app.dosie.dosieWorkInfoForm.technicalSkills")} :`}</Typography>
              </Grid>
              <Grid item xs={12} className={`${themeItems.flexGridItm} ${themeItems.inputBig}`}>
                        <Field
                          name="technicalSkills"
                          component={FTextField}
                          variant="outlined"
                          rows={5}
                          multiline
                        />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {openAlertDialog && (
        <AlertDialog
          id="dosiePersonalInfoEditAlertDialog"
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(values) => {
            props.save(values);
            props.setIsAddDosie(false);
          }}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </div>
  );
}
