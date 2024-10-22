import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { translate } from "../util/lang/translate-wrapper";

DrawerItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  selected: PropTypes.bool,
  nested: PropTypes.number,
  icon: PropTypes.element,
};

function DrawerItem(props) {
  const theme = useTheme();
  const classes = {
    ListItemButton: {
      paddingTop: "3px",
      paddingBottom: "3px",
      "&.Mui-selected": {
        backgroundColor: "#b357c2" //drawer item
      }
    },
    listItemText: {
      marginLeft: "-15px",
    },
    nested: {
      paddingTop: "4px",
      paddingBottom: "4px",
      paddingLeft: theme.spacing(4),
      backgroundColor: "#f3f2f2",
      "&:hover": {
        backgroundColor: "#b3b3b3",
      },
      dense: true,
      "&.Mui-selected": {
        backgroundColor: "#91beee",
      },
    },
    nested2: {
      paddingTop: "4px",
      paddingBottom: "4px",
      paddingLeft: theme.spacing(11),
      backgroundColor: "#dad9d8",
      "&:hover": {
        backgroundColor: "#b3b3b3",
      },
      dense: true,
      "&.Mui-selected": {
        backgroundColor: "#91beee",
      },
    },
  };

  const { to, name, selected, nested, icon, onClick, pathname } = props;
  const location = useLocation()

  return (
    <ListItemButton 
      sx={classes.ListItemButton}
      button
      selected={to === location.pathname}
      key={name}
      component={RouterLink}
      to={to}
    >
      {icon && <ListItemIcon sx={{color: "#00a3e0"}}>{icon}</ListItemIcon>}
      <ListItemText sx={classes.listItemText}>
        <Typography component="p" variant="subtitle2" color="inherit">
          {translate("app.drawer." + name)}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}

export default DrawerItem;
