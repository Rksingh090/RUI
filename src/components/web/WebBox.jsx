import React from 'react';

import {BiLogoNodejs} from 'react-icons/bi'

const WebBox = () => {
  return (
    <div className='webBox withShadow round'>
      <div className="webBoxData">
        <div className="webImage">
          <BiLogoNodejs size={35} />
        </div>
        <div className="webDetails">
          <h4 className='appName'>Node JS</h4>
          <p className='webLine'>App Port: 84500</p>
          <p className='webLine'>Container Port: 5000</p>
        </div>
      </div>
    </div>
  )
}

export default WebBox