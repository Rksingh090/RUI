import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { CiDark } from 'react-icons/ci'
import { BsSun } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Error404 = () => {

  const { theme, changeTheme } = useTheme()

  return (
    <div className='rectScreen center gapSM errorElem'>
      <h1>Error: 404 🚫</h1>
      <br />
      <p className='primaryText'>The page not found or maybe in maintainance.</p>
      <p>Try Again Later....</p>

      <div className='corner topRight gapMD' onClick={changeTheme}>
        {theme === "light" ? (
          <CiDark size={26} style={{cursor: "pointer"}} />
        ) : (
          <BsSun size={22} style={{cursor: "pointer"}} />
        )}
      </div>

      <Link to={"/"} >
        <AiOutlineHome style={{cursor: "pointer"}} size={20} />
      </Link>
    </div>
  )
}

export default Error404