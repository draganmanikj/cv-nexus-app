import {createContext} from "react";

export const ThemeContext = createContext({
    toggleTheme: () => {alert("toggle theme not implemented")},
    increaseFontSize: () => {alert("set theme size not implemented")},
    decreaseFontSize: () => {alert("set theme size not implemented")},
});