import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../func/timesince';
import { API } from '../../constants';

const WebBox = ({ data }) => {

  const [imageErr, setImageErr] = useState(false)

  return (
    <Link to={`/web/${data?._id}/${data?.name}`} className='webBox withShadow round'>

      <div className='webBoxImg withShadow roundSM'>
        {
          imageErr ? (
            <span className='fsm'>No Image</span>
          ): (
            <img 
            src={`${API}/screenshot/${data.name}.png`} 
            onError={() => setImageErr(true)} alt="" />
          )
        }
      </div>

      <div className="webBoxData">
        <h4 className='appName'>{data?.name}</h4>
        <p className='webLine'>Exposed Port: {data?.exposed_port || 80}</p>
        <p className='webLine'>Host Port: {data?.bind_port}</p>
        <p className='webLine primaryText'>http://localhost:{data?.bind_port}</p>
        <span></span>
        <span></span>
        {data?.deploy_with === "docker_image" && (
          <p className='webLine'>Image: {data?.deploy_source}</p>
        )}
        {data?.deploy_with === "github" && (
          <p className='webLine'>Deploy Source: {data?.deploy_with}</p>
        )}
        <p className='webLine fadeText'>Created: {timeSince(new Date(data?.created_at))}</p>
      </div>
    </Link>
  )
}

export default WebBox