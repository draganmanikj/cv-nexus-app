import React, { useState, useEffect } from "react";
import { HasAuth } from "asseco-commons";
import { useLocation } from "react-router-dom";
import { List, useTheme } from "@mui/material";
import DrawerItem from "./DrawerItem";
import HomeIcon from "@mui/icons-material/Home";
// import { KORISNICI, SUPERADMIN, OPERATORI } from "../util/userRoleConstants";

const customStyles = (theme) => ({
  list: {
    width: "240px",
    "& .MuiListItemIcon-root": {
      width: "2.25rem",
      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
      },
    },
  },
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
});

export default function DrawerTreeList() {
  const theme = useTheme();
  const classes = customStyles(theme);
  const location = useLocation();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <List sx={classes.list}>
      <DrawerItem to="/" name="pochetna" pathname="/" icon={<HomeIcon />} />
      
      {/* <HasAuth any={[SUPERADMIN, OPERATORI]}>
        <DrawerItem
          to="/example"
          name="example"
          pathname="/example"
          icon={<ComputerIcon />}
        />
      </HasAuth> */}
    </List>
  );
}
