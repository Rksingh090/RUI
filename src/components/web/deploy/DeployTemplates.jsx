import React from 'react'
import { availableTemplates } from '../../../config/templates';
import { Link } from 'react-router-dom';


const DeployTemplates = () => {

  return (
    <div className='deployTemplates'>
      {
        availableTemplates &&
        availableTemplates.map((template, idx) => (
          <Link to={`/add/web?template=${template?.name}#custom-deploy`} key={idx} className='template roundSM'>
            <div className='templateImg'>
              <img src={template?.icon} width={"150px"} height={"150px"} alt="" />
            </div>
            <p>{template?.name}</p>
          </Link>
        ))
      }
    </div>
  )
}

export default DeployTemplates