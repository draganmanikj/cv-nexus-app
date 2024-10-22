import React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import AppBarContents from "./app-bar-contents";
import { NotificationListenerContainer } from "./notificationListener";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "./drawer/DrawerList";
import {
  ToastAlertContainer,
  ConfirmContainer,
  FullScreenIframeContainer,
} from "asseco-commons";
import { useTheme } from "@mui/material";
import { Height } from "@mui/icons-material";

const drawerWidth = 240;

const customStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.modal,
    background: "linear-gradient(240deg, #0090e0 0%, #007ee0 70%, #006be0 100%);", //app-bar 
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiButtonBase-root':{
      width: drawerWidth
    },
    "& .MuiPaper-root":{
      background: "linear-gradient(240deg, #0090e0 0%, #007ee0 70%, #006be0 100%);", //drawer
      color: "white",
      top: "64px",
      maxHeight: "calc(100vh - 64px)",
      "& svg":{
        color: "white",
      }
    },
  },
  iframeContainer: {
    position: "fixed",
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: "white",
    top: 0,
    bottom: 70, //compensate for toolbar height
    right: 0,
    left: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
});

export default function MainLayout(props) {
  const theme = useTheme();
  const classes = customStyles(theme);
  const [open, setOpen] = React.useState(true);
  const { frameless = false } = props;

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div style={classes.root}>
      <CssBaseline />
      {!frameless && (
        <AppBar position="fixed" sx={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <AppBarContents />
          </Toolbar>
        </AppBar>
      )}
      {!frameless && (
        <Drawer
          sx={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {/* <Divider /> */}
          <DrawerList />
          <Divider />
        </Drawer>
      )}
      <main style={open ? classes.contentShift : classes.content}>
        {/* {!frameless && <div style={classes.toolbar} />} */}
        {props.children}
      </main>
      <ConfirmContainer />
      <FullScreenIframeContainer
        frameless={frameless}
        sx={classes.iframeContainer}
        style={{ left: !frameless && open ? drawerWidth : undefined }}
      />
      <ToastAlertContainer />
      <NotificationListenerContainer />
    </div>
  );
}
