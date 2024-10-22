import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { translate } from "../util/lang/translate-wrapper";
import Link from '@mui/material/Link';

DrawerItemOuterLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  href: PropTypes.string.isRequired,
};

function DrawerItemOuterLink(props) {
  const theme = useTheme();
  const classes = {
    ListItemButton: {
      paddingTop: "3px",
      paddingBottom: "3px",
      "&.Mui-selected": {
        backgroundColor: "#b6a268"
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

  const { name, icon, href } = props;

  return (
    <ListItemButton 
      sx={classes.ListItemButton}
      button
      key={name}
      component={Link}
      href={href}
      target="_blank"
    >
      {icon && <ListItemIcon sx={{color: "#a70023"}}>{icon}</ListItemIcon>}
      <ListItemText sx={classes.listItemText}>
        <Typography component="p" variant="subtitle2" color="inherit">
          {translate("app.drawer." + name)}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}

export default DrawerItemOuterLink;
