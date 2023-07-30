import React from 'react'
import IconButton from '../common/IconButton'

import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const WebHeader = () => {
    return (
        <div className="webHeader roundSM">
            <div className="webStart">
                <p>Total Websites: 10</p>
            </div>
            <div className="webMiddle">

            </div>
            <div className="webEnd">
                <Link to={"/add/web"}>
                    <IconButton text={"Add Website"} classList={"gapSM roundSM fontMD"} Icon={<AiOutlinePlus size={17} />} />
                </Link>
            </div>
        </div>
    )
}

export default WebHeader