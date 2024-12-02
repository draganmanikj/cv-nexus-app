import React, { useState} from 'react';
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
import AlertDialog from "../../util/alert/AlertDialog";
import { translate } from "../../util/lang/translate-wrapper";


const RolesPositionTypesDialogComponent = (props) => {
   
    return (
    <>
    <Dialog open={props.open} fullWidth maxWidth="md">
        <DialogTitle>
                {translate(`app.rolesPositionTypes.${props.item.id ? "rolePositionEditDialog" : "rolePositionAddDialog"}`)}
        </DialogTitle>
        
        
        <Formik initialValues={props.item} 
        enableReinitialize 
        onSubmit={(values) => {
            if (props.item && props.item.id)
                    values.id = props.item.id;
                props.setEditDialog({ ...values, active: true });
        }}>
            {(formikProps) => (
                <Form>

                <DialogContent>
                    <Container>
                        <Grid container spacing={2}> 
                            <Grid item xs={12}>
                                <Field
                                    name="name"
                                    label={translate("app.rolesPositionTypes.table.name")}
                                    component={FTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="nameMk"
                                    label={translate("app.rolesPositionTypes.table.nameMK")}
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

export default RolesPositionTypesDialogComponent
