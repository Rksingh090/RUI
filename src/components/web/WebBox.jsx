import React from 'react';
import { Link } from 'react-router-dom';

const WebBox = ({ data }) => {
  return (
    <Link to={`/web/${data?._id}/${data?.name}`} className='webBox withShadow round'>

      <div className="webBoxData">
          <h4 className='appName'>{data?.name}</h4>
          <p className='webLine'>App Port: {data?.exposed_port || 80}</p>
          <p className='webLine'>Container Port: {data?.bind_port}</p>
          <p className='webLine primaryText'>http://localhost:{data?.bind_port}</p>
      </div>
    </Link>
  )
}

export default WebBox