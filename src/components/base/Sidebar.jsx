import React, { useMemo } from 'react'

// utils 
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom';

// icons 
import { LiaDocker } from 'react-icons/lia';
import { LuSettings } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { GiSpiderWeb } from 'react-icons/gi';
import { FiGithub } from 'react-icons/fi';
import { BsFolder2Open, BsTerminalDash } from 'react-icons/bs';

// import { BsDatabase } from 'react-icons/bs';
// import { BiNetworkChart } from 'react-icons/bi';

const Sidebar = () => {
  const { menuOpen } = useTheme();
  const sidebarMenu = useMemo(() => ({
    links: [
      {
        name: "Dashboard",
        href: "/",
        icon: <RxDashboard size={18} />
      },
      {
        name: "Web App",
        href: "/web",
        icon: <GiSpiderWeb size={18} />
      },
      {
        name: "Files",
        href: "/files",
        icon: <BsFolder2Open size={18} />
      },
      // {
      //   name: "Database",
      //   href: "/database",
      //   icon: <BsDatabase size={18} />
      // },
      // {
      //   name: "Network",
      //   href: "/network",
      //   icon: <BiNetworkChart size={18} />
      // },
      {
        name: "Terminal",
        href: "/terminal",
        icon: <BsTerminalDash size={18} />
      },
      {
        name: "Docker",
        href: "/docker",
        icon: <LiaDocker size={18} />
      },
      {
        name: "Github",
        href: "/github",
        icon: <FiGithub size={18} />
      },
      {
        name: "Setting",
        href: "/setting",
        icon: <LuSettings size={18} />
      },
    ]
  }), [])


  return (
    <div className={`Sidebar ${menuOpen === "true" ? "open" : "close"}`}>
      <ul className="sidebarInner flexCol">
        {
          sidebarMenu.links &&
          sidebarMenu.links.length > 0 &&
          sidebarMenu.links.map((meniItem, idx) => (
            <li className="sidebarItem" key={idx}>
              <Link className="flexRow gapMD" to={meniItem?.href}>
                {meniItem?.icon}
                <span>{meniItem?.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar