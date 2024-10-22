import React, { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { connect } from "react-redux";
import { push } from "redux-first-history";
import {ProfilePage} from "asseco-commons";
import { translate } from "./util/lang/translate-wrapper";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DocsPage from "./util/components/DocsPage.js";
import KeyIcon from '@mui/icons-material/Key';
import {useTheme} from "@mui/material";
import {HasAuth} from "asseco-commons";
import { properties } from "./config/properties"; 

function ProfileButton(props) {

  const theme = useTheme();
  const classes = {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  };
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openProfilePage, setOpenProfilePage] = useState(false);
  const [openDocsPage, setOpenDocsPage] = useState(false);

  function handleSignout(event) {
    props.dispatch(push("/logout"));
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleOpenDocsPage = () => {
    setOpenDocsPage(true);
    handleClose()
  };

  const handleCloseDocsPage = () => {
    setOpenDocsPage(false);
  };

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleOpenProfilePage = () => {
    setOpenProfilePage(true);
  };

  const handleCloseProfilePage = () => {
    setOpenProfilePage(false);
  };

  const handleOpenPasswordChangePage = () => {
    let url = `${properties.oidcAuthority}/login-actions/reset-credentials`; 
    window.open(url, '_self');
  };

  return (
    <>
      <Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          sx={{zIndex: theme.zIndex.appBar+1}}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOpenProfilePage}>
            <PersonIcon sx={classes.menuButton} />
            {translate("app.profile.label")}
          </MenuItem>
          <HasAuth any={["KORISNICI"]}>
            <MenuItem onClick={handleOpenPasswordChangePage}>
              <KeyIcon sx={classes.menuButton} />
              {translate("app.changePassword")}
            </MenuItem>
          </HasAuth>
          <MenuItem onClick={handleOpenDocsPage}>
            <AssignmentIcon sx={classes.menuButton} />
            {translate("app.docs")}
          </MenuItem>
          <MenuItem onClick={handleSignout}>
            <ExitToAppIcon sx={classes.menuButton} />
            {translate("app.signOut")}
          </MenuItem>
        </Menu>
      </Fragment>
      {openProfilePage && (
        <ProfilePage open={openProfilePage} onClose={handleCloseProfilePage} />
      )}
      {openDocsPage && (
        <DocsPage open={openDocsPage} onClose={handleCloseDocsPage} />
      )}
    </>
  );
}

export default connect()(ProfileButton);
