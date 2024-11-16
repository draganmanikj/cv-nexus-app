import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box, Grid, Paper} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {translate} from "../../util/lang/translate-wrapper";
import { withStyles } from '@mui/styles';
import EducationComponent from './EducationComponent/EducationComponent';
import TrainingsComponent from './TrainingsComponent/TrainingsComponent';
import ProjectsComponent from './ProjectsComponent/ProjectsComponent';
import { useDispatch, useSelector } from "react-redux";
import operationsEducation from "./EducationComponent/duck/operations"
import operationsTrainings from "./TrainingsComponent/duck/operations"
import operationsProjects from "./ProjectsComponent/duck/operations"
import WGButton from '../wordUtils/WGButton';
import { templateTypesObj } from "../wordUtils/enum/templateTypes";
import LanguageComponent from "./LanguageComponent/LanguageComponent"
import operationsLanguages from "./LanguageComponent/duck/operations"

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
        width: "100%"
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

const OtherComponent = (props) => {
    const dispatch = useDispatch();
    const { education, loading, dosie, trainings, projects } = useSelector((state) => ({
        education: state.education.education,
        loading: state.education.loading,
        dosie: state.dosie.userDosie,
        trainings: state.trainings.trainings,
        projects: state.projects.projects
      }));

    const theme = useTheme();
const classes = useStyles();
    const [expanded, setExpanded] = useState();
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    console.log("selectedUser", props.selectedUser)
    const [openWGDialog, setOpenWGDialog] = useState(false);
    const userDosie = props.selectedUser ? props.selectedUser : dosie
  useEffect(() => {
    userDosie && dispatch(operationsEducation.fetchEducationById(userDosie.id)) 
            && dispatch(operationsTrainings.fetchTrainingsById(userDosie.id)) 
            && dispatch(operationsProjects.fetchProjectsById(userDosie.id)) 
            && dispatch(operationsLanguages.fetchLanguagesById(userDosie.id)) 
  }, [props.selectedUser, userDosie]);

  return (
    <>
      <Grid style={{ marginBottom: "20px" }} item xs={12}>
                <LocalLibraryIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
                <span style={{ fontSize: "25px", color: "#3452b4" }}>
                    {translate("app.dosie.other.header")}
                </span>
            </Grid>
            <Grid container justifyContent="flex-end" style={{ padding: '1rem' }}>
                <Paper variant="outlined" style={{ padding: '1rem' }} >
                    <Grid container justifyContent="flex-end" alignItems="center" spacing={2} >
                        <Grid item>
                            <Typography color="textSecondary">
                            {translate("app.dosie.other.generateCv")}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <WGButton
                            inputData={{
                                idUser: userDosie.user.userId,
                                // idEducation: education,
                                // idTrainings: trainings,
                                // idProjects: projects
                            }}
                            setOpenWGDialog={setOpenWGDialog}
                            openWGDialog={openWGDialog}
                            templateType={templateTypesObj.EDUCATION}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
            style={{ ...(expanded === "panel1" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>{translate("app.dosie.other.education")}</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.other.educationInfo")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.body}>
                        <EducationComponent
                            education={education} 
                            loading={loading} 
                            dosie={userDosie}
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
                    <Typography className={classes.heading}>{translate("app.dosie.other.trainings")}</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.other.trainingsInfo")}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box className={classes.body}>
                        <TrainingsComponent
                            loading={loading} 
                            dosie={userDosie}
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
                    <Typography className={classes.heading}>{translate("app.dosie.other.projects")}</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.other.projectsInfo")}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box className={classes.body}>
                        <ProjectsComponent
                            loading={loading} 
                            dosie={userDosie}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
            style={{ ...(expanded === "panel4" && {border:"2px solid #00a3e0", borderRadius:"5px"})}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>{translate("app.dosie.other.languages")}</Typography>
                    <Typography className={classes.secondaryHeading}>{translate("app.dosie.other.languagesInfo")}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box className={classes.body}>
                        <LanguageComponent
                            loading={loading} 
                            dosie={userDosie}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

      </>
  );
};

export default OtherComponent;
