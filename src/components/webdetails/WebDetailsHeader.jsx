import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb } from '../../context/WebContext';
import IconButton from '../common/IconButton'

import { AiOutlineBackward, AiOutlineDelete } from 'react-icons/ai';
import { RxStop } from 'react-icons/rx';
import { PiHammer,PiPlay } from 'react-icons/pi';
import { RiRestartLine } from 'react-icons/ri';

const WebDetailsHeader = () => {
    const navigate = useNavigate();

    const {
        singleWeb, rebuildContainer, startContainer,
        stopContainer, deleteWebsite, restartContainer,
        actionLoading
    } = useWeb();


    return (
        <div className="splitHeader withShadow padSM roundSM">
            <IconButton onClick={() => navigate(-1)} Icon={<AiOutlineBackward size={16} />} classList={"gapSM secondaryBg small roundSM"} text={"Back"} />

            <div className='flexRow gapMD padXSM'>
                {(
                    singleWeb.container_detail?.State?.Status === "exited" ||
                    singleWeb.container_detail?.State?.Status === "paushed"
                ) && (
                        <IconButton
                            loadingSize={14} loading={actionLoading?.starting}
                            text={"Start"} Icon={<PiPlay size={14} />}
                            classList={"gapSM primaryBg small roundSM"}
                            onClick={startContainer}
                        />
                    )}
                {singleWeb.container_detail?.State?.Status === "running" && (
                    <IconButton
                        loadingSize={14} loading={actionLoading?.stoping}
                        text={"Stop"} Icon={<RxStop size={14} />}
                        classList={"gapSM primaryBg small roundSM"}
                        onClick={stopContainer} />
                )}
                <IconButton
                    loadingSize={14} loading={actionLoading?.restarting}
                    text={"Restart"} Icon={<RiRestartLine size={14} />}
                    classList={"gapSM success small roundSM "}
                    onClick={restartContainer} />
                <IconButton
                    loadingSize={14} loading={actionLoading?.rebuilding}
                    text={"Rebuild"} Icon={<PiHammer size={14} />}
                    classList={"gapSM info small roundSM "}
                    onClick={rebuildContainer} />
                <IconButton
                    loadingSize={14} loading={actionLoading?.deleting}
                    text={"Delete"} Icon={<AiOutlineDelete size={14} />}
                    classList={"gapSM error small roundSM"}
                    onClick={deleteWebsite} />
            </div>
        </div>
    )
}

export default WebDetailsHeader