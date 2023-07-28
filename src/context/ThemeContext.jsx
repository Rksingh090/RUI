import React from 'react'
import { createContext, useContext, useState } from "react";

const themeCtx = createContext();

export const useTheme = () => useContext(themeCtx);

const ThemeContext = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [menuOpen, setMenuOpen] = useState(localStorage.getItem("menuState") || "true");


    const changeTheme = () => {
        localStorage.setItem("theme", theme === "light" ? "dark" : "light")
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    const changeMenu = () => {
        let revMenuState = menuOpen === "true" ? "false" : "true";
        localStorage.setItem("menuState", revMenuState);
        setMenuOpen(revMenuState);
    }

    const setNamedTheme = (themeName = "dark") => {
        let validThemes = ["light", "dark","gray", "blue", "pink", "teal", "dracula", "orange"];
        if (validThemes.includes(themeName)) {
            setTheme(themeName)
            localStorage.setItem("theme", themeName);
        }
        else {
            setTheme("dark")
            localStorage.setItem("theme", "dark");
        }
    }

    return (
        <themeCtx.Provider value={{
            theme, setTheme,
            changeTheme, setNamedTheme,
            menuOpen, setMenuOpen,
            changeMenu
        }}>
            {children}
        </themeCtx.Provider>
    )
}

export default ThemeContext