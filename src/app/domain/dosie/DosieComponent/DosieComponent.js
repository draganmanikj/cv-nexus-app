import React, { useEffect, useState, useRef } from "react";
import { FAutocomplete, FTextField } from "asseco-commons";
import { translate } from "../../../util/lang/translate-wrapper";
import { useDispatch, useSelector } from "react-redux";
import operations from "../duck/operations";
import {
  Grid,
  Button,
  Tabs,
  Typography,
  Tab,
  Box,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Formik, Form, Field } from "formik";
import { properties } from "../../../config/properties";
import CardActions from "@mui/material/CardActions";
import AddIcon from "@mui/icons-material/Add";
import DosieDetailsComponent from "./DosieDetails/DosieDetailsComponent";
import { Documents } from "./../../documents";
import {statusOptions}  from "../../../util/enum/statusEnum";
import UsersTable from "./UsersTable";
import LockScreenDialog from "../../../util/lock/LockScreenDialog";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useLocation } from 'react-router-dom';
import WGButton from "../../wordUtils/WGButton";
import { templateTypesObj } from "../../wordUtils/enum/templateTypes";
import OtherComponent from "../../education/OtherComponent.js";
import { ReportProblem } from "@mui/icons-material";
import GroupIcon from '@mui/icons-material/Group';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles ((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    "& .css-1ujykiq-MuiButtonBase-root-MuiTab-root.Mui-selected":{
      color:"white",
      borderBottom:"5px solid white"
    }
  },

  gridItemStyles: {
    height: "100% !important",
    display: "flex !important",
    alignItems: "flex-end !important",
    "& .MuiFormControl-root" :{
      marginTop : "0 !important",
      marginBottom: "0 !important",
      verticalAlign: "bottom"
    },
  },
  flexGridItm: {
    display: "flex !important",
    alignItems: "flex-end !important",
  },
  mb025rem: {
    marginBottom: "0.25rem",
  },
  flexEnd:{
    justifyContent:"flex-end"
  },
  noDosieStyles: {
    height: "calc(70dvh - 64px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 'bold'
  }
}));


const DosieComponent = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();
  const [rerenderdosie, setRerenderdosie] = useState(true);
  const [tab, setTab] = useState(0);
  const card_ref = useRef();
  const [selectedUser, setSelectedUser] = useState(undefined);
  const location = useLocation();
  const [isAddDosie, setIsAddDosie] = useState(false)
  const [openWGDialog, setOpenWGDialog] = useState(false);
  const [vacationDays, setVacationDays] = useState()
  const isOwnDosie = window.location.href?.includes("moedosie");
  const usernameMoeDosie = useSelector((state) => state.oidc.user?.profile.user_name);
  const username = selectedUser ? selectedUser.user.name : usernameMoeDosie;
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const isAdmin = userGroups?.includes("admins");
  const { documents, loading } = useSelector((state) => ({
    document: state?.documents?.documents,
    loading: state?.documents?.loading,
  }));


  const { users, oidc, user } = useSelector((state) => ({
    users: state?.dosie?.users,
    oidc: state?.oidc,
    user: state?.oidc?.user
  }));

  const initialValues = {};

  useEffect(() => {
    username && dispatch(operations.fetchUserVacationDays(username))
      .then(res => {setVacationDays(res)})
  }, [username])

  useEffect(() => {
    if ( isOwnDosie) { // stranica moedosie
      dispatch(operations.fetchDosieByUser(usernameMoeDosie))
        .then(res => res?.id && setSelectedUser())
    }

  }, [isOwnDosie]);

  useEffect(() =>{
    location.pathname === "moedosie" && setIsAddDosie(false)
  }, [isAddDosie])

  const rerender = () => {
    setRerenderdosie(!rerenderdosie);
    props.resetReducer();
  };

  const save = (dosie) => {
    if (dosie.id) {
      dispatch(operations.updateDosie(dosie));
    } else {
      dispatch(operations.createDosie(dosie));
    }
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleScrollToForm = () => {
    window.scrollTo({
      component: card_ref.current,
      behavior: "smooth",
      top: card_ref.current.offsetTop,
    });
  }

  return (
      <>  
      {oidc.isLoadingUser === false && !props.singleDosie && (
        <>
          <Grid item xs={12}>
            <Formik
              initialValues={initialValues}
              isInitialValid={false}
              key={rerenderdosie}
              onSubmit={values => {
                dispatch(operations.fetchFilteredUsers({
                  ...values,
                  ...(values.applicationRole) && {applicationRole: {name: values.applicationRole.name.name}},
                  ...(values.status) && {status: values.status.value}
                }));
              }}
            >
              {(formikProps) => (
                <Form id="searchDosies" autoComplete="off">
                  <Card style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                    <CardHeader
                      title={
                          <Grid style={{ marginBottom: "15px" }} item xs={12}>
                            {" "}
                            <GroupIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
                            <span style={{ fontSize: "25px", color: "#3452b4" }}>
                              {" "}
                              {translate("app.dosie.formularPrebarajHeader")}
                            </span>
                          </Grid>
                      }
                    />
                    <CardContent>
                      <Grid container spacing={1} key={rerenderdosie} style={{alignItems:"center"}}>
                        <Grid item xs={3} >
                          <Field
                            name="position_no"
                            label={translate("app.dosie.positionBroj")}
                            component={FTextField}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="user.name"
                            label={translate("app.dosie.username")}
                            component={FTextField}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="user.firstName"
                            label={translate("app.dosie.firstName")}
                            component={FTextField}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="user.lastName"
                            label={translate("app.dosie.lastName")}
                            component={FTextField}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="user.email"
                            label={translate("app.dosie.email")}
                            component={FTextField}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="applicationRole.name"
                            placeholder={translate("app.dosie.sektor")}
                            label={formikProps.values?.applicationRole?.name ? translate("app.dosie.sektor") : ""}
                            component={FAutocomplete}
                            getOptionValue={(option) => option.name}
                            getOptionLabel={(option) => option.name}
                            loadOnNoOptions={true}
                            async={{
                              url: `${properties.api.root}/roles/search`,
                              method: "get",
                              minChar: 2,
                            }}
                            margin="none"
                          />
                        </Grid>
                        <Grid item xs={3} >
                          <Field
                            name="status"
                            placeholder={translate("app.dosie.status")}
                            label={formikProps.values?.status ? translate("app.dosie.status") : ""}
                            component={FAutocomplete}
                            options={statusOptions}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.label}
                            margin="none"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions className={classes.flexEnd}>
                      <Tooltip title={translate("app.generic.search")}>
                        <span>
                          <Button
                            id="searchButton"
                            size="small"
                            color="primary"
                            type="submit"
                            variant="outlined"
                          >
                            {translate("app.generic.search")}
                          </Button>
                        </span>
                      </Tooltip>
                      <Tooltip title={translate("app.generic.add")}>
                              <span>
                                <Button
                                  id="addButton"
                                  size="small"
                                  type="button"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => setIsAddDosie(true)}
                                >
                                  <AddIcon />
                                  {translate("app.generic.addButton")}
                                </Button>
                              </span>
                            </Tooltip>
                            <Tooltip title={translate("app.generic.clearFilters")}>
                              <span>
                                <Button
                                  id="clearButton"
                                  size="small"
                                  type="button"
                                  variant="contained"
                                  color={"secondary"}
                                  onClick={rerender}
                                >
                                  {translate("app.generic.clearFiltersButton")}
                                </Button>
                              </span>
                            </Tooltip>
                    </CardActions>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
          {props.loading && location.pathname.includes("vraboteni") && <LockScreenDialog open={props.loading} id={"rolesLockScreenDialog"} />}
          {users !== undefined && users.length !== 0 && (
            <Card style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
              <UsersTable
                data={users}
                onSelect={(row) => 
                  dispatch(operations.fetchDosieByUser(row.user.name)).then(()=> {setSelectedUser(row); handleScrollToForm()})
                }
                selectedUser={selectedUser}
              />
            </Card>)}
         </>)
      }
      
      {props.loading && location.pathname.includes("moedosie") && <LockScreenDialog open={props.loading} id={"dosieScreenDialog"}/>}
      {(props.isDosie === false && location.pathname.includes("moedosie")) &&
        <Grid container className={classes.noDosieStyles}>
          <Grid item xs={12}>
            <ReportProblem style={{marginRight: "0.5rem", verticalAlign: "middle", fontSize:"6rem", margin: "0 auto", display: "block"}} color="primary"/>
            <Typography component='h2' align="center" style={{fontWeight: "bold", fontSize: "1.5rem", fontStyle: "italic"}}>
              {translate("app.dosie.noDosieInfo")}
            </Typography>
          </Grid>
        </Grid>}
        
        {(props.userDosie || isAddDosie) && <Card
          ref={card_ref}
        >
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                variant="fullWidth"
                value={tab}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Евиденција" {...a11yProps(0)} style={{ fontWeight: 'bold' }}/>
                <LinkTab label="Документација" {...a11yProps(1)} style={{ fontWeight: 'bold' }}/>
                <LinkTab label="Отсуства" {...a11yProps(2)} style={{ fontWeight: 'bold' }}/>
                <LinkTab label="Боледување" {...a11yProps(3)} style={{ fontWeight: 'bold' }}/>
                <LinkTab label="Друго" {...a11yProps(4)} style={{ fontWeight: 'bold' }}/>
                {isAdmin && <LinkTab label="Излезно интервју" {...a11yProps(5)} style={{ fontWeight: 'bold' }}/> }
              </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
              <DosieDetailsComponent 
                isAddDosie={isAddDosie} 
                setIsAddDosie={setIsAddDosie} 
                save={save}
                selectedUser={selectedUser}
              />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Documents
                selectedUser={selectedUser}
                documents={documents} 
                loading={loading} 
              />
            </TabPanel>
            <TabPanel value={tab} index={4}>
              <Grid item container xs={11} style={{margin: '0 auto', padding: '1rem'}}>
                <OtherComponent selectedUser={selectedUser}/>
              </Grid>
            </TabPanel>
          </div>
        </Card>
      }
    </>

  );
};

export default DosieComponent;
