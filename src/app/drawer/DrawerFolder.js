import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Edit, ExpandLess, ExpandMore, FolderOpen } from "@mui/icons-material";
import { translate } from "../util/lang/translate-wrapper";

DrawerFolder.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  selected: PropTypes.bool,
  nested: PropTypes.number,
  icon: PropTypes.element,
};

const customStyles = (theme) => ({
  listItem: {
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  listItemText: {
    marginLeft: "-15px",
  },
  nested: {
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: theme.spacing(4),
    backgroundColor: "#cc8fd6",
    "&:hover": {
      backgroundColor: "#cc8fd6",
    },
    dense: true,
    "&.Mui-selected": {
      backgroundColor: "#cc8fd6",
    },
  },
  nested2: {
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: theme.spacing(11),
    backgroundColor: "#cc8fd6",
    "&:hover": {
      backgroundColor: "#cc8fd6",
    },
    dense: true,
    "&.Mui-selected": {
      backgroundColor: "#cc8fd6",
    },
  },
});

function DrawerFolder(props) {
  const theme = useTheme();
  const { to, name, selected, nested, icon, onClick, pathname } = props;
  const [openInner, setOpenInner] = useState(false);
  const classes = customStyles(theme);
  return (
    <>
      <ListItemButton
        onClick={() => {
          setOpenInner(!openInner);
        }}
        button
        selected={selected ? selected : false}
        key={name}
        component={to ? RouterLink : undefined}
        to={to}
        sx={
          nested === 1
            ? classes.nested
            : nested === 2
            ? classes.nested2
            : undefined
        }
      >
        {<ListItemIcon sx={{color: "#cc8fd6"}}>{icon ? icon : <FolderOpen />}</ListItemIcon>}
        <ListItemText sx={classes.listItemText}>
          <Typography component="p" variant="subtitle2" color="inherit">
            {translate("app.drawer." + name)}
          </Typography>
        </ListItemText>
        {openInner ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openInner || selected} timeout="auto" unmountOnExit>
        <List component="div" sx={{paddingLeft: "1rem"}}>
          {props.children}
        </List>
      </Collapse>
    </>
  );
}

export default DrawerFolder;
