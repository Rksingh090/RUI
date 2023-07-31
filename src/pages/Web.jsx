import React from 'react'
import WebBox from '../components/web/WebBox'
import "../styles/web.css";
import WebHeader from '../components/web/WebHeader';


const Web = () => {
  

  

  return (
    <div className='fullXY withPadding flexCol gapLG'>
      <WebHeader />
      <div className="webBoxes">
        <WebBox />
        <WebBox />
        <WebBox />
        <WebBox />
      </div>
    </div>
  )
}

export default Web