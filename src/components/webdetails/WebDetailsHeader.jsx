import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '../common/IconButton'
import { AiOutlineBackward, AiOutlineDelete } from 'react-icons/ai';
import { FaPlay, FaStop } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';
import { useWeb } from '../../context/WebContext';

const WebDetailsHeader = () => {
    const navigate = useNavigate();

    const { rebuildWebsite } = useWeb();


    return (
        <div className="splitHeader withShadow roundSM">
            <IconButton onClick={() => navigate(-1)} Icon={<AiOutlineBackward size={16} />} classList={"noBg gapSM fontMD"} text={"Back"} />

            <div className='flexRow gapLG padXSM'>
                <FaPlay title={'Start'} className='successText cursorPointer' size={15} />
                <FaStop title={'Stop'} className='errorText cursorPointer' size={15} />
                <VscDebugRestart title={"Rebuil Container"} className='infoText cursorPointer' size={18} onClick={rebuildWebsite} />
                <IconButton text={"Delete"} classList={"gapSM"} Icon={<AiOutlineDelete size={15} />} />
            </div>
        </div>
    )
}

export default WebDetailsHeader