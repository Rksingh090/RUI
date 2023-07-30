import React from 'react'
import { availableTemplates } from '../../../config/templates';

const DeployTemplates = ({ onSelectTemplate }) => {
  return (
    <div className='deployTemplates'>
      {
        availableTemplates &&
        availableTemplates.map((template, idx) => (
          <button onClick={() => onSelectTemplate(template?.name)} key={idx} className='template roundSM'>
            <div className='templateImg'>
              <img src={template?.icon} width={"150px"} height={"150px"} alt="" />
            </div>
            <p>{template?.name}</p>
          </button>
        ))
      }
    </div>
  )
}

export default DeployTemplates