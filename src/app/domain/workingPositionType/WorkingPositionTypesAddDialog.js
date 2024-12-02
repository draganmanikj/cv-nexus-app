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
import { FTextField } from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import * as Yup from "yup";
import AlertDialog from "../../util/alert/AlertDialog";

export default function WorkingPositionTypesAddDialog(props) {
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const validationSchema = Yup.object().shape({
        // name: Yup.string()
        //     .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, translate("app.notifications.errorSignWithWhitespace"))
        //     .max(120, translate("app.notifications.maxLength120"))
        //     .required(translate("app.notifications.errorRequired")),
        // nameMk: Yup.string()
        //     .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, translate("app.notifications.errorSignWithWhitespace"))
        //     .max(120, translate("app.notifications.maxLength120"))
        //     .required(translate("app.notifications.errorRequired")),

    });
    const initialValues = { ...props.item };
    return (
        <>
            <Dialog
                id={props.id ? props.id : "workingPositionTypesDialog"}
                fullWidth={true}
                maxWidth="md"
                open={props.open}
                //onClose={props.onClose}
            >
                <DialogTitle>
                    {translate(`app.groups.${props.item.id ? "editTitle" : "addTitle"}`)}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        //  props.save({ ...values, active: true });
                        if (props.item && props.item.id)
                            values.id = props.item.id;
                        setOpenAlertDialog({ ...values, active: true });
                    }}
                >
                    {(formikProps) => (
                        <Form id={props.id ? props.id + "Form" : "workingPositionTypesDialogForm"} autoComplete="off" noValidate>
                            <DialogContent>
                                <Container>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                required
                                                name="name"
                                                label={translate("app.workingPositionTypes.table.name")}
                                                component={FTextField}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                required
                                                name="nameMk"
                                                label={translate("app.workingPositionTypes.table.nameMk")}
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
            {openAlertDialog && (
                <AlertDialog
                    id={"workingPositionTypesAlertDialog"}
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
