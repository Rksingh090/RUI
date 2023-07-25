import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";

const themeCtx = createContext();

export const useTheme = () => useContext(themeCtx);

const ThemeContext = ({ children }) => {

    const [theme, setTheme] = useState("dark");

    const [menuOpen, setMenuOpen] = useState(true);

    useEffect(() => {
        let getTheme = localStorage.getItem("theme");
        if (getTheme && getTheme !== undefined) {
            setTheme(getTheme);
        } else {
            let defaultDark = window.matchMedia('(prefer-color-scheme: dark)').matches;
            localStorage.setItem("theme", defaultDark ? "dark" : "light")
            setTheme(defaultDark ? "dark" : "light")
        }
    }, [])


    const changeTheme = () => {
        localStorage.setItem("theme", theme === "light" ? "dark" : "light")
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    const setNamedTheme = (themeName = "dark") => {
        let themeCheck;
        switch (themeName) {
            case "light":
                themeCheck = "light";
                break;
            case "dark":
                themeCheck = "dark";
                break;
            case "purple":
                themeCheck = "purple";
                break;
            default:
                themeCheck = "dark"
                break;
        }
        setTheme(themeCheck)
        localStorage.setItem("theme", themeCheck);
    }

    return (
        <themeCtx.Provider value={{
            theme, setTheme, 
            changeTheme,setNamedTheme,
            menuOpen, setMenuOpen, 
        }}>
            {children}
        </themeCtx.Provider>
    )
}

export default ThemeContext