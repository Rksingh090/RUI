import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { CiDark } from 'react-icons/ci';
import { BsSun } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { theme, changeTheme, changeMenu } = useTheme();


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
        <div className="iconWrap effect" onClick={changeTheme}>
          {theme === "light" ? (
            <CiDark size={26} />
          ) : (
            <BsSun size={22} />
          )}
        </div>
      </div>

    </div>
  )
}

export default Navbar