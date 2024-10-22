import React, {  Fragment } from "react";
import Typography from "@mui/material/Typography/Typography";
import {
  useTheme,
  Box
} from "@mui/material";
import ProfileButton from "./profile-button";
import { connect } from "react-redux";
import Logo from "./util/images/ASEE_LOGO.png";
import { Link as RouterLink } from "react-router-dom";
import NotificationButton from "./notification-button";
import { translate } from "./util/lang/translate-wrapper";
import "./App.css";
import LanguageSelector from "./LanguageSelector";

const customStyles = (theme) => ({
  title: {
    flexGrow: 1,
    "& > * + *": {
      marginLeft: "4rem",
    },
    "& a:hover": {
      color: "#00a3e0",
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  links: {
    "& a": {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: "4rem",
    },
    "& a:hover": {
      color: "#00a3e0",
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  grow: {
    flexGrow: 1,
  },
  dashboard: {
    textDecoration: "none",
  },
  imgPadding: {
    paddingTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    left: "calc(50% + 80px)",
    position: "absolute",
  },

  buttonWrapper: {
    display: "flex-end",
    width: "4rem",
  }
});

const AppbarContents = props => {
  const { theme } = props;
  const classes = customStyles(theme);
    return (
      <Fragment>
        <img
          alt="logo"
          width="250"
          height="62"
          className="flag"
          src={Logo}
        />

        <RouterLink to="/" key="/" style={{ textDecoration: "none", marginLeft: "15px" }}>
          <Typography
            component="a"
            variant="h6"
            color="inherit"
            noWrap
            sx={classes.dashboard}
            style={{
              color: "white",
            }}
          > 
            {translate("app.applicationName")}
          </Typography>
        </RouterLink>

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={classes.title}
        >
          {props.header.title}
        </Typography>
  
        <Typography align="right">{props.fullName}</Typography>
        <ProfileButton />
        <Box sx={classes.buttonWrapper}>       
          <NotificationButton />
        </Box>
        <LanguageSelector/>
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  header: "header", //state.header,
  fullName: state.oidc.user.profile.name,
});
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

function AppBarWrapper(props) {
  const theme = useTheme();
  return <AppbarContents {...props} theme={theme} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarWrapper);
