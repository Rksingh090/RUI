import React from 'react'
import "../styles/home.css";

import { BsCpu } from "react-icons/bs";
import { BiMemoryCard } from "react-icons/bi";
import { PiHardDriveLight } from "react-icons/pi";
import { FaRunning } from "react-icons/fa";

const Home = () => {
  return (
    <div className='homePage fullXY withPadding'>
      <div className="homePageStats">
        <div className="dashboardCard roundSM">
          <BsCpu size={40} />
        </div>
        <div className="dashboardCard roundSM">
          <BiMemoryCard size={40} />
        </div>
        <div className="dashboardCard roundSM">

          <PiHardDriveLight size={40} />
        </div>
        <div className="dashboardCard roundSM">

          <FaRunning size={35} />
        </div>
      </div>
    </div>
  )
}

export default Home