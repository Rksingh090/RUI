import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { LiaDocker } from 'react-icons/lia';
import { FiSettings } from 'react-icons/fi';
import { BsAppIndicator, BsDatabase, BsFolder2Open, BsTerminalDash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { menuOpen } = useTheme();

  useEffect(() => {
    fetch("http://localhost:4000/api")
    .then(() => console.log("Hello"))
    .catch((e) => console.log(e))
  }, [])

  return (
    <div className={`Sidebar ${menuOpen === "true" ? "open" : "close"}`}>
      <ul className="sidebarInner flexCol">
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/web">
            <BsAppIndicator size={18} />
            <span>Web Apps</span>
          </Link>
        </li>
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/files">
            <BsFolder2Open size={18} />
            <span>Files</span>
          </Link>
        </li>
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/database">
            <BsDatabase size={18} />
            <span>Database</span>
          </Link>

        </li>
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/terminal">
            <BsTerminalDash size={18} />
            <span>Terminal</span>
          </Link>
        </li>
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/docker">
            <LiaDocker size={18} />
            <span>Docker</span>
          </Link>

        </li>
        <li className="sidebarItem">
          <Link className="flexRow gapMD" to="/settings">
            <FiSettings size={18} />
            <span>Settings</span>
          </Link>

        </li>
      </ul>
    </div>
  )
}

export default Sidebar