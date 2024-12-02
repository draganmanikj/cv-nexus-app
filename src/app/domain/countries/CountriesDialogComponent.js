import React from 'react'
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
import { FTextField } from "asseco-commons";

import { translate } from "../../util/lang/translate-wrapper";

const CountriesDialogComponent = (props) => {
  return (
    <>
       <Dialog open={props.open} fullWidth maxWidth="md">
        <DialogTitle>
            {translate(`app.country.${props.item.id ? "countryEditDialog" : "countryAddDialog"}`)}
        </DialogTitle>
        {/* enableReinitialize onSubmit={(values) => props.create(values)} */}
        
        <Formik initialValues={props.item} 
        enableReinitialize 
        onSubmit={(values) => {
            if (props.item && props.item.id)
                    values.id = props.item.id;
                props.setEditDialog({ ...values, active: true });
        }} >
            {(formikProps) => (
                <Form>

                <DialogContent>
                    <Container>
                        <Grid container spacing={2}> 
                            <Grid item xs={12}>
                                <Field
                                    
                                    name="ime"
                                    label={translate("app.country.table.name")}
                                    component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    
                                    name="drzavjanstvoMk"
                                    label={translate("app.country.table.citizenship")}
                                    component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    
                                    name="kod2"
                                    label={translate("app.country.table.code")}
                                    component={FTextField}
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
    </>
  )
}

export default CountriesDialogComponent
