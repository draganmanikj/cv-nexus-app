import React, { useState, useEffect } from "react";
import { FormControl, Icon, Menu, MenuItem, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import actions from "./duck/actions";
import IconButton from "@mui/material/IconButton";
import { translate } from "./util/lang/translate-wrapper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const customStyles = (theme) => ({
  menuStyles: {
    "& .MuiButtonBase-root": {
      height: "40px !important",
    },
    "& .MuiList-root": {
      background:
        "linear-gradient(240deg, #313131 0%, #3e3e3e  70%, #585858 100%)", //language
      color: "white",
    },
  },
});

function LanguageSelector() {
  const [languageValue, setLanguageValue] = useState(
    localStorage.getItem("appLanguage") ?? "mk"
  );
  const theme = useTheme();
  const classes = customStyles(theme);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const setLanguage = (value) => {
    setLanguageValue(value);
    dispatch(actions.languageValueChange(value));
    localStorage.setItem("appLanguage", value);
    window.location.reload(false);
  };

  useEffect(() => {
    document.title = translate("app.applicationName");
  }, [languageValue]);

  return (
    <FormControl style={{ margin: "0 0.5rem 0 0.5rem", color: "white" }}>
      <IconButton
        aria-owns={open ? "menu-lanugage" : undefined}
        aria-haspopup="true"
        style={{ width: "50px", height: "50px" }}
        onClick={handleMenu}
        color="inherit"
      >
        <h6>{languageValue.toUpperCase()}</h6>
        <Icon>
          <KeyboardArrowDownIcon />
        </Icon>
      </IconButton>
      <Menu
        id="menu-lanugage"
        anchorEl={anchorEl}
        open={open}
        sx={{ ...classes.menuStyles, zIndex: theme.zIndex.appBar + 1 }}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            backgroundColor: languageValue === "mk" ? '#0071e3' : "initial",
            "&:hover" :{
              backgroundColor: '#0071e3'
            }
          }}
          value="mk"
          onClick={() => setLanguage("mk")}
        >
          <h6>MK</h6>
        </MenuItem>
        {/* <MenuItem
          sx={{
            backgroundColor: languageValue === "al" ? "#b6a268" : "initial",
            "&:hover" :{
              backgroundColor: "#b6a268"
            }
          }}
          value="al"
          onClick={() => setLanguage("al")}
        >
          <h6>AL</h6>
        </MenuItem> */}
        <MenuItem
          sx={{
            backgroundColor: languageValue === "en" ? '#0071e3' : "initial",
            "&:hover" :{
              backgroundColor: '#0071e3'
            }
          }}
          value="en"
          onClick={() => setLanguage("en")}
        >
          <h6>EN</h6>
        </MenuItem>
      </Menu>
    </FormControl>
  );
}

export default LanguageSelector;
