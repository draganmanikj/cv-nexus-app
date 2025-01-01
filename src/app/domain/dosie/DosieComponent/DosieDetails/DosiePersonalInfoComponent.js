import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Grid,
  Typography
} from "@mui/material";
import { translate } from "../../../../util/lang/translate-wrapper";
import { FTextField, FDatePicker, FAutocomplete } from "asseco-commons";
import AlertDialog from "../../../../util/alert/AlertDialog";
import {properties} from "../../../../config/properties";
import * as Yup from "yup";
import { phoneRegex } from "../../../../util/components/Regexes";
import { maritalStatusEnum } from "../../../../util/enum/statusEnum";
import {statusOptions}  from "../../../../util/enum/statusEnum";
import { genderOptions } from "../../../../util/enum/statusEnum";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

const useStyles = makeStyles ((theme) => ({
  inputDisabled: {
    "& .MuiInputBase-root":{
      color:"grey !important"
    }
  },
  selectStyles: {
    "& .MuiSelect-select": {
      padding: "8.5px 14px",
      "& .MuiSelect-nativeInput": {
        bottom: "4px !important",
      },
    },
    "& label": {
      zIndex: "1111 !important",
      top: "-8px",
      padding: "0 0.25rem!important",
    },
    "& label.Mui-focused":{
      backgroundColor: "white !important",
      top: "0 !important"
    }
  },
  styledDropDownInput: {
    "& label": {
      backgroundColor: "white !important",
      top: 0,
      padding: "4px !important",
      zIndex: "1111 !important",
    },
  },
  fDatePickerStyles:{
    "& .css-1wqufre-MuiInputBase-root-MuiOutlinedInput-root":{
      width: "37vw",
      display: "flex",
      justifyContent: "center",
      alignItems:"center",
      "@media (max-width: 768px)": {
      width: "37vw", 
    },

    "@media (max-width: 480px)": {
      width: "37vw", // Full width for very small screens
    }
    }
  }
}));

export default function DosiePersonalInfoComponent(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [initialValues, setInitialValues] = useState({})
  // const styles = generateStyles()
  const licenseOptions = [
    {value: 0, label: translate("app.dosie.ne")},
    {value: 1, label: translate("app.dosie.da")},
];
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const isAdmin = userGroups.includes("admins");
  const licenseOptionsReversed = licenseOptions.slice().reverse()
  const validationSchema = Yup.object().shape({
    user: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
    phoneNumber: Yup.string()
      .required(translate("app.notifications.errorRequired"))
      .matches(phoneRegex, translate("app.notifications.phoneNumberField"))
      .min(12, translate("app.notifications.errorMinMaxLengthPhoneNumber"))
      .max(24, translate("app.notifications.errorMinMaxLengthPhoneNumber"))
      .nullable(),
    status: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
    gender: Yup.object()
      .required(translate("app.notifications.errorRequired"))
      .nullable(),
  });

  const dosiePersonal = props.selectedUser ? props.selectedUser : props.dosie
  useEffect(() => {
    props.isAddDosie && setInitialValues({});
    dosiePersonal && 
      setInitialValues({...dosiePersonal,
          status: statusOptions.find(item => item.value === dosiePersonal.status),
          gender: genderOptions.find(item => item.value === dosiePersonal.gender),
          drivingLicence: licenseOptionsReversed.find(item => item.value === dosiePersonal.drivingLicence),
          isMarried: dosiePersonal.isMarried ? 
            maritalStatusEnum.find(item => item.value === dosiePersonal.isMarried) : 
            undefined
      })
  }, [props.isAddDosie, dosiePersonal])

  return (
    <div >
      {/*Лични податоци: Име, Презиме, ЕМБГ, Телефон*/}

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => setOpenAlertDialog({ ...values, 
          status: values.status.value,
          gender: values.gender.value,
          ...(values.drivingLicence) && {drivingLicence: values.drivingLicence.value},
          ...(values.isMarried) && {isMarried: values.isMarried.value}
        })}
      >
        {(formikProps) => (
          <Form id={"dosiePersonalInfoEditForm"} autoComplete="off">
            {console.log("formikProps", formikProps)}
            <Grid container justifyContent="flex-end">
              <Button
                style={{ marginRight: "5px" }}
                color="primary"
                variant="outlined"
                type="submit"
              >
                {translate("app.generic.save")}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                type="reset"
              >
                {translate("app.generic.cancel")}
              </Button>
            </Grid>

            <Grid container spacing={2} justifyContent="center" alignContent="flex-start" >
                <Grid item xs={6} className={!isAdmin && classes.inputDisabled}>
                  <Field
                  name="user.firstName"
                  label={`${translate("app.users.table.firstName")} *`}
                  component={FTextField}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
                </Grid>
                <Grid item xs={6} className={!isAdmin && classes.inputDisabled}>
                  <Field
                  name="user.lastName"
                  label={`${translate("app.users.table.lastName")} *`}
                  component={FTextField}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
                </Grid>
              <Grid item xs={6} className={ (!isAdmin && classes.inputDisabled)}>
                <Field
                  name="user"
                  label={formikProps.values?.user ? `${translate("app.users.table.name")} *` : ""}
                  placeholder={`${translate("app.users.table.name")} *`}
                  component={FAutocomplete}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  async={{
                    url: `${properties.api.root}/internal-users/users/search`,
                    method: "get",
                  }}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
              </Grid>
              <Grid item xs={6} className={!isAdmin && classes.inputDisabled}>
                  <Field
                  name="user.email"
                  label={`${translate("app.users.table.email")} *`}
                  component={FTextField}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
                </Grid>
              <Grid item xs={6} className={!isAdmin && classes.inputDisabled}>
                <Field
                  name="applicationRole"
                  label={formikProps.values?.applicationRole ? translate("app.roles.form.roleName") : ""}
                  placeholder={translate("app.roles.form.roleName")}
                  component={FAutocomplete}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  async={{
                    url: `${properties.api.root}/roles`,
                    method: "get",
                    minChar: 1,
                  }}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
              </Grid>
              <Grid item xs={6} className={!isAdmin && classes.inputDisabled}>
                  <Field
                  name="applicationRole.application.name"
                  label={`${translate("app.users.table.company")} *`}
                  component={FTextField}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
                </Grid>
                <Grid item xs={6}>
                <Field
                  name="address"
                  label={`${translate("app.dosie.dosiePersonalInfoForm.address")}`}
                  component={FTextField}
                  margin="none"
                />
              </Grid>
              <Grid item xs={6} >
                <Field
                  name="phoneNumber"
                  label={`${translate("app.dosie.dosiePersonalInfoForm.phoneNumber")} *`}
                  component={FTextField}
                  margin="none"
                  // required
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="isMarried"
                  placeholder={translate("app.dosie.dosiePersonalInfoForm.isMarried")}
                  label={formikProps.values?.isMarried ? translate("app.dosie.dosiePersonalInfoForm.isMarried") : ""}
                  component={FAutocomplete}
                  options={maritalStatusEnum}
                  getOptionValue={option => option.value}
                  getOptionLabel={option => option.label}
                  margin="none"
                />
              </Grid>
              <Grid item xs={6} className={classes.fDatePickerStyles}>
                <div >
                  <Field
                    name="dateBirth"
                    label={translate("app.dosie.dosiePersonalInfoForm.dateBirth")}
                    component={FDatePicker}
                    format={"DD.MM.YYYY"}
                    renderInputVariant="outlined"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="cbReligion"
                  label={formikProps.values?.cbReligion ? translate("app.dosie.cbReligion") : ""}
                  placeholder={translate("app.dosie.cbReligion")}
                  getOptionLabel={(option) => option.naziv}
                  getOptionValue={(option) => option.id}
                  component={FAutocomplete}
                  loadOnNoOption={true}
                  async={{
                      url: `${properties.api.root}/religion/searchByNaziv`,
                      method: "get",
                      minChar: 1,
                  }}
                  margin="none"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="cbNarodnosti"
                  label={formikProps.values?.cbNarodnosti ? translate("app.dosie.cbNationality") : ""}
                  placeholder={translate("app.dosie.cbNationality")}
                  getOptionLabel={(option) => option.naziv}
                  getOptionValue={(option) => option.id}
                  component={FAutocomplete}
                  loadOnNoOption={true}
                  async={{
                    url: `${properties.api.root}/narodnosti/searchByNaziv`,
                    method: "get",
                    minChar: 1,
                  }}
                  margin="none"
                />
              </Grid>
              <Grid item xs={6}>
                  <Field
                      name="drivingLicence"
                      placeholder={`${translate("app.dosie.drivingLicence")}`}
                      label={formikProps.values?.drivingLicence ? `${translate("app.dosie.drivingLicence")}` : ""}
                      component={FAutocomplete}
                      options={licenseOptionsReversed}
                      margin="none"
                  />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="gender"
                  placeholder={`${translate("app.dosie.gender")} *`}
                  label={formikProps.values?.gender ? `${translate("app.dosie.gender")} *` : ""}
                  component={FAutocomplete}
                  options={genderOptions}
                  margin="none"
                />
              </Grid>
              <Grid item xs={12} className={!isAdmin && classes.inputDisabled}>
                <Field
                  name="status"
                  placeholder={`${translate("app.dosie.status")} *`}
                  label={formikProps.values?.status ? `${translate("app.dosie.status")} *` : ""}
                  component={FAutocomplete}
                  options={statusOptions}
                  margin="none"
                  disabled={ isAdmin ? false : true }
                />
              </Grid>
              <Grid item xs={12} sx={{marginBottom:"4rem"}}>
              <Typography color="textSecondary" variant="body2">{`${translate("app.dosie.dosieWorkInfoForm.organizationalSkills")} :`}</Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop:"1rem"}}>
                        <Field
                          name="organizationalSkills"
                          component={FTextField}
                          variant="outlined"
                          rows={5}
                          multiline
                        />
              </Grid>
              <Grid item xs={12} sx={{marginBottom:"4rem"}}>
              <Typography color="textSecondary" variant="body2">{`${translate("app.dosie.dosieWorkInfoForm.technicalSkills")} :`}</Typography>
              </Grid>
              <Grid item xs={12} sx={{marginTop:"1rem"}}>
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
          onFunction={(values) => {props.save(values); props.setIsAddDosie(false)}}
          text={translate("app.notifications.saveConfirm")}
        />
      )}
    </div>
  );
}
