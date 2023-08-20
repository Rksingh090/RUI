import React from 'react'
import IconButton from '../components/common/IconButton'
import { AiOutlinePlus } from 'react-icons/ai'

const DockerNetwork = () => {
  return (
    <div className='withPadding'>
      <div className="webHeader padSM roundSM">
        <div className="webStart">
        <IconButton
          Icon={<AiOutlinePlus size={16} />}
          classList={"primaryBg roundSM gapSM small"}
          text={"New Network"}
        />

        </div>
        <div className="webMiddle"></div>
        <div className="webEnd"></div>
      </div>
      <h2>Docker Network</h2>
    </div>
  )
}

export default DockerNetwork