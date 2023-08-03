import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../func/timesince';

const WebBox = ({ data }) => {
  return (
    <Link to={`/web/${data?._id}/${data?.name}`} className='webBox withShadow round'>

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