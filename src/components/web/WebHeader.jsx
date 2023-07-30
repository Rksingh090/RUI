import React from 'react'
import IconButton from '../common/IconButton'

import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const WebHeader = () => {
    return (
        <div className="webHeader roundSM">
            <div className="webStart">
                <Link to={"/add/web"}>
                    <IconButton text={"Add Website"} classList={"gapSM primaryBg roundSM fontSM"} Icon={<AiOutlinePlus size={14} />} />
                </Link>
            </div>
            <div className="webMiddle">
            </div>
            <div className="webEnd">
                <p>Total Websites: 10</p>
            </div>
        </div>
    )
}

export default WebHeader