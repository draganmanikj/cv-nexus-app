import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DosiePersonalInfoComponent from './DosiePersonalInfoComponent';
import {Box, Grid} from "@mui/material";
import DosieWorkInfoComponent from "./DosieWorkInfoComponent";
import {useSelector} from "react-redux";
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import {translate} from "../../../../util/lang/translate-wrapper";
import { withStyles } from '@mui/styles';
import WorkingPositionsComponent from "./WorkingPositionsComponent/WorkingPositionsComponent";
import RolesPositionsComponent from './RolesPositionsComponent/RolesPostionsComponent';

const useStyles = makeStyles ((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    body: {
        width: "100%",
        maxWidth: "1600px",
        "& .MuiGrid-item": {
            height: "68px",
            display: "flex",
            alignItems: "flex-end",
            "& .MuiFormControl-fullWidth":{
                height: "100% !important"
            },
            "& .MuiFormControl-root" :{
                justifyContent: "flex-end !important"
            },
            "& .MuiTypography-root":{
                fontSize: "1rem !important"
            },
            "& .MuiInput-root": {
                fontSize: "1rem !important"
            }
        },
        "& svg" :{
            verticalAlign: "sub"
        },
        "& .MuiGrid-item:has(h6)":{
            alignItems: "center",
            height: "56px !important",
            "& h6 svg": {
                fontSize: "22px !important",
            }
        },
        "& .MuiGrid-item:has(h6) + .MuiGrid-item":{
            justifyContent: "flex-end !important",
            alignItems: "center"
        }
        
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const Accordion = withStyles({
    root: {
        maxWidth: "1600px"
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const DosieDetailsComponent = (props) => {

    const theme = useTheme();
const classes = useStyles();
    const {userDosie} = useSelector((state) => ({
        userDosie: state.dosie.userDosie,
    }));
    const {family} = useSelector((state) => ({
        family: state.family.families
    }));
    const [expanded, setExpanded] = useState("panel1");
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Grid style={{ marginBottom: "20px" }} item xs={12}>
                {" "}
                <PersonPinOutlinedIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
                <span style={{ fontSize: "25px", color: "#3452b4" }}>
                    {" "}
                    {translate("app.dosie.dosieEvidencijaHeadr")}
                </span>
            </Grid>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
            style={{ ...(expanded === "panel1" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Лични податоци</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.personalData")}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{root: classes.body}}>
                    <Box className={classes.body}>
                        <DosiePersonalInfoComponent
                            save={props.save}
                            dosie={userDosie}
                            isAddDosie={props.isAddDosie}
                            setIsAddDosie={props.setIsAddDosie}
                            selectedUser={props.selectedUser}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
            style={{ ...(expanded === "panel3" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Работни позиции</Typography>
                    <Typography className={classes.secondaryHeading}>Историјат на работни позиции</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box className={classes.body}>
                        <WorkingPositionsComponent
                            dosie={userDosie}
                            isAddDosie={props.isAddDosie}
                            setIsAddDosie={props.setIsAddDosie}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}
            style={{ ...(expanded === "panel5" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>{translate("app.dosie.roles")}</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.rolesPosition")}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box className={classes.body}>
                        <RolesPositionsComponent
                            dosie={userDosie}
                            isAddDosie={props.isAddDosie}
                            setIsAddDosie={props.setIsAddDosie}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
            style={{ ...(expanded === "panel2" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Службени податоци на вработениот</Typography>
                    <Typography className={classes.secondaryHeading}>Број на вработен, Датум на вработување, Работна позиција и историјат</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.body}>
                        <DosieWorkInfoComponent
                            save={props.save}
                            dosie={userDosie}
                            isAddDosie={props.isAddDosie}
                            setIsAddDosie={props.setIsAddDosie}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            
            

        </>
    )
}

export default DosieDetailsComponent;
