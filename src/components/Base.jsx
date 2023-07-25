import React from 'react'
import Navbar from './Navbar'

import "./styles/base.css";
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';


const Base = ({ children }) => {
  const {menuOpen} = useTheme();
  return (
    <div>
        <Navbar />
        <div className='baseDevider' style={{
          gridTemplateColumns: menuOpen ? 
          "200px 1fr" :
          "60px 1fr"
        }}>
            <Sidebar />
            <div>
              {children}
            </div>
        </div>
    </div>
  )
}

export default Base