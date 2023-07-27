import React from 'react'
import WebBox from '../components/web/WebBox'

const Web = () => {
  return (
    <div className='fullXY withPadding'>
      <div className="webBoxes">
        <WebBox />
        <WebBox />
      </div>
    </div>
  )
}

export default Web