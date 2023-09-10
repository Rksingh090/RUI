import React, { useEffect, useRef } from 'react';

import '../styles/github.css';
import IconButton from '../components/common/IconButton';

import { FiGithub } from 'react-icons/fi';

const Github = () => {
    const openNewTab = () => {
        window.open("https://github.com/apps/rpanel/installations/new", "_blank")
    }

    return (
        <div className='fullXY withPadding githubPage'>
            <div className='githubContainer withShadow roundSM padSM'>
                <div className="fullXY flexCenter">
                    <IconButton
                        onClick={openNewTab}
                        Icon={<FiGithub size={20} />}
                        text={"Configure Github"}
                        classList={"gapMD secondaryBg hoverMain changeSVG roundSM padSM"}
                        style={{
                            padding: "10px 15px"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Github