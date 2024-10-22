import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {deepmerge} from "@mui/utils";
import {ThemeContext} from "./util/theme/ThemeContext";

const getColorOptions = (mode,fontSize) => ({
    palette: {
        mode:mode,
        primary: {
            main: mode === "dark" ? "#cc8fd6" : "#b6a268",
            contrastText: "white",
          },
          secondary: {
            main: mode === "dark" ? "#007ee0" : "#d68fce",
          },
          error: {
            main: mode === "dark" ? "#900101" : "#ff0000",
          },
          default: { main: "#555", contrastText: "white" },
    },

    typography: {
        fontSize:fontSize,
    },
});

let drawerWidth = 240;
let coreTheme = createTheme({});
let baseTheme = {
    zIndex: {
        appBar: coreTheme.zIndex.modal
    }
};


function getInitialColorMode() {
    const inStorage = localStorage.getItem("colorMode");

    return inStorage === 'dark' ? 'dark' : 'light';//ako ima gluposti vo storage difoltiraj na properties
}

function getInitialFontSize() {
    const inStorage = localStorage.getItem("fontSize");

    return (Number.isInteger(parseInt(inStorage)) && parseInt(inStorage) >= 0) ? parseInt(inStorage) : 14;//ako ima gluposti vo storage difoltiraj na properties
}

function ThemeManager(props) {
    const [themeColorMode, setThemeColorMode] = React.useState(getInitialColorMode());
    const [themeFontSize, setThemeFontSize] = React.useState(getInitialFontSize());
    const theme  = React.useMemo(
        ()=>{
            return createTheme(deepmerge(baseTheme,getColorOptions(themeColorMode, themeFontSize)));
        },
        [themeColorMode,themeFontSize])
    const themeState = React.useMemo(
        () => {
            return {
                toggleTheme: () => {
                    setThemeColorMode((prevVal) => {const nextVal = prevVal === 'light' ? 'dark' : 'light'; localStorage.setItem("colorMode",nextVal); return nextVal});
                },
                increaseFontSize: () => {
                    setThemeFontSize((prevVal) => {const nextVal = prevVal+1; localStorage.setItem("fontSize",nextVal); return nextVal});
                },

                decreaseFontSize: () => {
                    setThemeFontSize((prevVal) => {
                        const nextVal = prevVal-1<0? prevVal: prevVal-1;
                        localStorage.setItem("fontSize",nextVal);
                        return nextVal
                    });
                },
            }},
        [],
    );
    return (

        <ThemeContext.Provider value={themeState}>
            <ThemeProvider theme={theme}>
                    {props.children}
            </ThemeProvider>

        </ThemeContext.Provider>
    );
}

export default ThemeManager;