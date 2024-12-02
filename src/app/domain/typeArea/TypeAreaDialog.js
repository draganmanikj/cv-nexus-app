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
const TypeAreaDialog = (props) => {
  return (
    <>
        <Dialog open={props.open} fullWidth maxWidth="md">
        <DialogTitle>
            {translate(`app.typeArea.${props.item.id ? "typeAreaEditDialog" : "typeAreaAddDialog"}`)}
        </DialogTitle>
        
        <Formik initialValues={props.item} 
            enableReinitialize 
            onSubmit={(values) => {
                if (props.item && props.item.id){
                    values.id = props.item.id;
                }
                props.setEditDialog({ ...values, active: true });
            }} 
        >
            {(formikProps) => (
                <Form>

                <DialogContent>
                    <Container>
                        <Grid container spacing={24}> 
                            <Grid item xs={12}>
                                <Field
                                    
                                    name="area"
                                    label={translate("app.typeArea.table.name")}
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

export default TypeAreaDialog
