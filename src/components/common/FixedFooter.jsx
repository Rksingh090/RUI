import React from 'react'
import { useTheme } from '../../context/ThemeContext';

const FixedFooter = () => {
    const { menuOpen } = useTheme();

    return (
        <div className="fixedBottomBar" style={{
            left: menuOpen === "true" ? "160px" : "60px"
        }}>
            <p>Version: v 1.0.0</p>
            <p>Copyright &copy;2023 - Rpanel@Rishab Singh</p>
            <p></p>
        </div>
    )
}

export default FixedFooter