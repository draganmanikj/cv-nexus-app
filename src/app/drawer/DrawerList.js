import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HasAuth } from "asseco-commons";
import { useLocation } from "react-router-dom";
import { List, useTheme } from "@mui/material";
import DrawerItem from "./DrawerItem";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DrawerFolder from "./DrawerFolder"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkIcon from '@mui/icons-material/Work';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import PrintIcon from '@mui/icons-material/Print';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
  const userGroups = useSelector((state) => state.oidc.user?.profile.groups);
  const adminGroup = "admins";
  const isAdmin = userGroups?.includes(adminGroup);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <List sx={classes.list}>
      <DrawerItem
        to="/"
        name="pochetna"
        pathname="/"
        icon={<HomeIcon />}
      />
      <DrawerItem
        to="/moedosie"
        name="moedosie"
        pathname="/moedosie"
        icon={<AssignmentIndIcon />}
      />
      {isAdmin &&
      <DrawerItem
        to="/korisnici"
        name="korisnici"
        pathname="/korisnici"
        icon={<PeopleAltIcon />}
      />
      }
      {isAdmin && 
      <DrawerFolder name="configuration" icon={<AdminPanelSettingsIcon />} >
        <DrawerItem
          to="/workingPositionTypes"
          name="workingPositionTypes"
          pathname="/workingPositionTypes"
          icon={<WorkIcon />}
        />
        <DrawerItem
          to="/rolesPositionTypes"
          name="rolesPositionTypes"
          pathname="/rolesPositionTypes"
          icon={<EmojiPeopleIcon />}
        />
        <DrawerItem
          to="/documentTypes"
          name="documentTypes"
          pathname="/documentTypes"
          icon={<ContentCopyIcon />}
        />
        <DrawerItem
          to="/countries"
          name="countries"
          pathname="/countries"
          icon={<PublicIcon />}
        />
        <DrawerItem
          to="/faculties"
          name="faculties"
          pathname="/faculties"
          icon={<SchoolIcon />}
        />
        <DrawerItem
          to="/universities"
          name="universities"
          pathname="/universities"
          icon={<AssuredWorkloadIcon />}
        />
        <DrawerItem
          to="/degree"
          name="degree"
          pathname="/degree"
          icon={<WorkspacePremiumIcon />}
        />
         <DrawerItem
          to="/areatype"
          name="areatype"
          pathname="/areatype"
          icon={<PersonIcon />}
        />
        <DrawerItem
          to="/languages"
          name="languages"
          pathname="/languages"
          icon={<LanguageIcon />}
        />
        <DrawerItem
          to="/output_documents"
          name="output_documents"
          pathname="/output_documents"
          icon={<PrintIcon />}
        />
      </DrawerFolder>
      }
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
