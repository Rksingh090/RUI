import React from 'react'
import WebBox from '../components/web/WebBox'
import "../styles/web.css";


const Web = () => {
  return (
    <div className='fullXY withPadding'>

      <div className="webBoxes">
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
      </div>
    </div>
  )
}

export default Web