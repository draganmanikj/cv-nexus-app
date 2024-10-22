import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  Button,
  Paper,
  Typography
} from "@mui/material";
import {
  FTextField,
  FAutocomplete,
  FSelect,
  LoadingComponent,
  FDatePicker, 
  isAuthorized,
} from "asseco-commons";
import { translate } from "../../lang/translate-wrapper";
import * as Yup from "yup";
import { embsRegex } from "../Regexes";
import { properties } from "../../../config/properties";
import { sittingDescTypeEnum, RGOstatusEnum, invitationStatusEnum } from "../../enum/enum";
import {useSelector} from "react-redux";


const useStyles = () => ({
  formRoot: {
    "& .MuiGrid-item": {
      "& .MuiFormControl-root": {
        marginBottom: "0",
        marginTop: "0",
        width: "100%",
      },
      "& input": {
        width: "100%",
      },
    },
  },
  tableRoot: {
    paddingLeft: "2px",
    paddingTop: "2px",
    paddingRight: "2px",
    borderRadius: "7px",
    background:
      "linear-gradient(to bottom, #c2002b, #b6a268, rgba(0, 0, 0, 0) 75%)",
    marginTop: "2rem",
    "& th:has(.MuiCheckbox-root)": {
      padding: "0.5rem 0 0.5rem 0.5rem !important",
      span: {
        padding: "0.5rem 0 0.5rem 0.5rem !important",
      },
    },
    "& td:has(.MuiCheckbox-root)": {
      padding: "0.5rem 0 0.5rem 0.5rem !important",
      span: {
        padding: "0.5rem 0 0.5rem 0.5rem !important",
      },
    },
  },
  root: {
    "& form": {
      width: "100%",
    },
    "& .MuiGrid-item": {
      display: "flex",
      alignItems: "flex-end",
      "& .MuiFormControl-root": {
        marginBottom: "0",
        marginTop: "0",
        width: "100%",
      },
      "& input": {
        width: "100%",
      },
    },
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
});

const FilterForm = (
  {
    getItems,
    resetItems,
    fromRoute
  }
  ) => {
  const classes = useStyles();
  const [rerender, setRerender] = useState(true);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [selectedNPForPokanaUcesnici,setSelectedNPForPokanaUcesnici] = useState();
  const [selectedPokanaForAdmin,setSelectedPokanaForAdmin] = useState();
  const [pokana,setPokana] = useState();
  const initialValues = {};
  const {permissions} = useSelector(state=>state.authorization);
  const isAdmin = permissions?isAuthorized(permissions,["SUPERADMIN","OPERATORI"]):false;//TODO moze i podobro ova

  const validationSchema = Yup.object().shape({
    edb: Yup.string()
      .min(5, translate("app.notifications.errorMinLength5"))
      .max(13, translate("app.notifications.errorMaxLength13"))
      .matches(/^[0-9]+$/, translate("app.notifications.numbersField"))
      .nullable(),
    embs: Yup.string()
      .matches(embsRegex, translate("app.notifications.embsField"))
      .min(3, translate("app.notifications.errorMinLength3"))
      .max(10, translate("app.notifications.errorMaxnLength10"))
      .nullable(),
    sittingNumber: Yup.string()
      .matches(/^[0-9]+$/, translate("app.notifications.numbersField"))
      .nullable(),
    sittingContinuationNum: Yup.string()
      .matches(/^[0-9]+$/, translate("app.notifications.numbersField"))
      .nullable(),
  });

  const resetForm = () => {
    resetItems();
    setRerender((rerender) => !rerender);
  };

  return (
    <Grid key={rerender} item xs={12} sx={classes.root}>
      <Formik
        onSubmit={(values) => getItems(values)}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Form autoComplete="off">
            <Grid container justifyContent="center" sx={classes.formRoot}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    paddingLeft: "1rem",
                    marginTop: "10px",
                    marginBottom: "20px",
                    width: "100%",
                  }}
                >
                  <CardHeader title={translate(`app.drawer.${fromRoute}`)} />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Field
                          name="registar"
                          component={FAutocomplete}
                          placeholder={translate(
                            "app.announcements.rgoNaziv"
                          )}
                          label={
                            formikProps.values.nazivKompanija
                              ? translate("app.announcements.rgoNaziv")
                              : ""
                          }
                          async={{
                            url: `${properties.api.root}/registar/search`,
                            method: "get",
                          }}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.nazivKompanija}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="embs"
                          label={translate("app.registracija.embsShort")}
                          component={FTextField}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="edb"
                          label={translate("app.registracija.edbShort")}
                          component={FTextField}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        sx={[
                          classes.selectStyles,
                          formikProps.values?.sittingDescTypeTitle &&
                            classes.styledDropDownInput,
                        ]}
                      >
                        <Field
                          name="sittingDescTypeNum"
                          label={translate(
                            "app.announcements.sittingDescTypeTitle"
                          )}
                          component={FSelect}
                          options={sittingDescTypeEnum}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name="rabotnoTelo"
                          component={FAutocomplete}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
                          async={{
                            url: `${properties.api.root}/sifrarnici/rabotniTela`,
                            method: "get",
                          }}
                          label={
                            formikProps.values.committeeTitle
                              ? translate("app.announcements.committeeTitle")
                              : ""
                          }
                          placeholder={translate(
                            "app.announcements.committeeTitle"
                          )}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Field
                          name="sittingNumber"
                          component={FTextField}
                          label={translate("app.announcements.sittingNumber")}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Field
                          name="sittingContinuationNum"
                          component={FTextField}
                          label={translate(
                            "app.announcements.sittingContinuationNum"
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name="sittingDate2"
                          component={FDatePicker}
                          format={"DD/MM/YYYY"}
                          label={translate("app.announcements.sittingDate")}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={[
                          classes.selectStyles,
                          formikProps.values?.sittingLocation &&
                            classes.styledDropDownInput,
                        ]}
                      >
                        <Field
                          name={"sittingLocation"}
                          component={FAutocomplete}
                          async={{
                            url: `${properties.api.root}/eParlament/getLocations`,
                            method: "get",
                          }}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.naziv}
                          label={
                            formikProps.values.committeeTitle
                              ? translate("app.eParlament.sittingLocation")
                              : ""
                          }
                          placeholder={translate(
                            "app.eParlament.sittingLocation"
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={[
                          classes.selectStyles,
                          formikProps.values?.statusTitle &&
                            classes.styledDropDownInput,
                        ]}
                      >
                        <Field
                          name="statusRgo"
                          component={FSelect}
                          options={RGOstatusEnum}
                          label={translate("app.announcements.statusTitle")}
                        />
                      </Grid>
                      {fromRoute === 'invitations' && 
                      <Grid
                        item
                        xs={3}
                        sx={[
                          classes.selectStyles,
                          formikProps.values?.statusTitle &&
                            classes.styledDropDownInput,
                        ]}
                      >
                        <Field
                          name="status"
                          label={translate(
                            "app.announcements.invitationStatus"
                          )}
                          component={FSelect}
                          options={invitationStatusEnum}
                        />
                      </Grid>
                      }
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      {translate("app.generic.search")}
                    </Button>
                    <Button
                      id="clearButton"
                      size="small"
                      type="button"
                      variant="contained"
                      color={"secondary"}
                      onClick={resetForm}
                    >
                      {translate("app.poraki.iscistiFiltriButton")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default FilterForm;
