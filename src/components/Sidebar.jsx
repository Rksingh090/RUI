import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { LiaDocker } from 'react-icons/lia';
import { FiSettings } from 'react-icons/fi';
import { BsAppIndicator, BsDatabase, BsFolder2Open, BsTerminalDash } from 'react-icons/bs';

const Sidebar = () => {
  const { menuOpen } = useTheme();

  return (
    <div className={`Sidebar ${menuOpen ? "open" : "close"}`}>
      <ul className="sidebarInner flexCol">
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <BsAppIndicator size={18} />
            <span>Web Apps</span>
          </a>
        </li>
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <BsFolder2Open size={18} />
            <span>Files</span>
          </a>
        </li>
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <BsDatabase size={18} />
            <span>Database</span>
          </a>

        </li>
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <BsTerminalDash size={18} />
            <span>Terminal</span>
          </a>
        </li>
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <LiaDocker size={18} />
            <span>Docker</span>
          </a>

        </li>
        <li className="sidebarItem">
          <a className="flexRow gapMD" href="">
            <FiSettings size={18} />
            <span>Settings</span>
          </a>

        </li>
      </ul>
    </div>
  )
}

export default Sidebar