import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';

import { AiOutlineBgColors, AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ValidThemes } from '../constants';


const Navbar = () => {
  const { changeMenu, setNamedTheme } = useTheme();
  const [showThemeSelect, setShowThemeSelect] = useState(false)


  return (
    <div className='Navbar'>

      <div className="navStart flexRow gapSM">
        <div className="iconWrap effect" onClick={changeMenu}>
          <HiOutlineMenuAlt2 size={22} />
        </div>
        <Link to="/" className='flg logoIcon'>RPanel</Link>
      </div>
      <div className="navMiddle">
        <div className="secondaryBG padXSM flexRow roundSM">
          <AiOutlineSearch size={20} className='mainIcon' />
          <input type="text" placeholder='Search' className='rpInput fmd fw300' style={{ width: "280px" }} />
        </div>
      </div>
      <div className="navEnd">
        <div className="navThemeIcon">
          <div className="iconWrap effect"
            onClick={() => setShowThemeSelect(prev => !prev)}
          >
            <AiOutlineBgColors size={20} />
          </div>
          <div className={`navThemeSelect ${showThemeSelect ? "active" : ""}`}>
            {
              ValidThemes.map((theme, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: theme.background,
                    "--delay": (idx * .05) + "s"
                  }}
                  className='withShadow'
                  onClick={() => setNamedTheme(theme.title)}
                  title={theme.title}
                >

                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar