import React from 'react'
import {Field, Form, Formik} from "formik";
import {translate} from "../../util/lang/translate-wrapper"
import {FAutocomplete, LoadingComponent} from "asseco-commons";
import {properties} from "../../config/properties";
import {Box, Dialog, DialogActions, DialogTitle, FormControl, Grid, Slide, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import operations from "./duck/operations";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PlayfullCV from "../../util/images/playfull.png"
import AtsCv from "../../util/images/ats.png"
import BoldCV from "../../util/images/bold.png"

const WGButton = (props) => {
    const templateType = props.templateType;
    const inputData = props.inputData;
    const setOpenWGDialog = props.setOpenWGDialog;
    const openWGDialog = props.openWGDialog;
    const buttonDisabled = props.buttonDisabled


    const dispatch = useDispatch();
    // const {loading} = useSelector(state => {
    //     return {
    //         loading: state.wordGeneration.loading
    //     }
    // })
    // if(loading) return <LoadingComponent />;

    return (
        <>
            <Button color="secondary" variant="outlined" disabled={buttonDisabled ? true : false} onClick={() => {
                setOpenWGDialog(true)
            }}>
                {translate('app.generic.print')}
            </Button>
        <Dialog
            open={openWGDialog}
            maxWidth={"md"}
            fullWidth={true}
        >
            <DialogTitle id="id">
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>{translate('app.generic.documentsPrinting')}</Box>
                    <Box>
                        <IconButton onClick={() => {
                            setOpenWGDialog(false)
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <Box
                // border={1}
                borderColor="primary.main"
                borderRadius="borderRadius"
                margin={3}
            >
                <Formik initialValues={{}} onSubmit={(values) => {
                    if(inputData instanceof Function){
                        const arr = inputData();
                        if(arr instanceof Array){
                            for(let i=0; i<arr.length; i++){
                                dispatch(operations.generateTemplateOp(values.templateId, arr[i]))
                            }
                        }
                    } else{
                        dispatch(operations.generateTemplateOp(values.templateId, inputData))
                    }
                }}>
                    {(formikProps) => (
                        <Form autoComplete="off" noValidate="novalidate">
                            <Grid container spacing={2}>
                                <Grid container sx={{marginLeft:"5rem", marginTop:"1rem" }}>
                                    <Grid item xs={4} sx={{color:"#0071e3"}}>
                                       <Typography variant='body2' sx={{display:"flex", justifyContent:"center", fontWeight:"bold"}}>Bold attorney resume</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{color:"#0071e3"}}>
                                       <Typography variant='body2' sx={{display:"flex", justifyContent:"center", fontWeight:"bold"}}>Playful bussiness resume</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{color:"#0071e3"}}>
                                       <Typography variant='body2' sx={{display:"flex", justifyContent:"center", fontWeight:"bold"}}>ATS Classic resume</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{marginLeft:"5rem", marginTop:"1rem",marginBottom:"1rem" }}>
                                    <Grid item xs={3} sx={{border:"1px solid black", borderRadius:"5px"}}>
                                      <img src={BoldCV} alt='playful' width="200px" height="280px" />
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3} sx={{border:"1px solid black", borderRadius:"5px"}}>
                                      <img src={PlayfullCV} alt='playful' width="200px"height="280px" />
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3} sx={{border:"1px solid black", borderRadius:"5px"}}>
                                      <img src={AtsCv} alt='playful' width="200px" height="280px"/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={10}>
                                    <Field
                                        required
                                        fullWidth
                                        name="templateId"
                                        label={translate("app.documentTypes.table.name")}
                                        placeholder={translate("app.documentTypes.table.name")}
                                        component={FAutocomplete}
                                        async={{
                                            url: `${properties.api.root}/templates/findAllByType?type=${templateType}`,
                                            // url: `${properties.api.root}/templates/filter`,
                                            method: "get",
                                        }}
                                        getOptionValue={(option) => option.id}
                                        getOptionLabel={(option) => option.name}
                                    />
                                </Grid>
                                <Grid item xs={2} alignItems="flex-end" alignContent={"flex-end"} justifyContent="flex-end"
                                      style={{
                                          paddingTop: "17px",
                                          paddingLeft: "20px",
                                      }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={!formikProps.values.templateId}
                                        type="submit"
                                    >
                                        {translate('app.generic.print')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}</Formik>
            </Box>
        </Dialog>
        </>
    );
}

export default WGButton;

WGButton.propTypes = {
    templateType: PropTypes.string,
    inputData: PropTypes.object.isRequired,
    setOpenWGDialog: PropTypes.func,
    openWGDialog: PropTypes.bool
};