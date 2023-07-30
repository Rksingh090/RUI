import React from 'react'
import Navbar from './Navbar'

import "../../styles/base.css";

import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { Outlet } from 'react-router-dom';


const Base = () => {
  const {menuOpen} = useTheme();
  
  return (
    <>
        <Navbar />
        <div className='baseDivider' style={{
          gridTemplateColumns: menuOpen === "true" ? 
          "200px 1fr" :
          "60px 1fr"
        }}>
            <Sidebar />
            <div className='minHeightDiv'>
              <Outlet />
            </div>
        </div>
    </>
  )
}

export default Base