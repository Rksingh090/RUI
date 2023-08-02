import React, { useEffect, useState } from 'react'
import "../styles/webdetails.css";
import { Link, useParams } from 'react-router-dom';
import TabBox from '../components/common/TabBox';
import IconButton from '../components/common/IconButton';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useWeb } from '../context/WebContext';
import WithLoading from '../components/common/WithLoading';
import RInput from '../components/common/RInput';
import { CgClose } from 'react-icons/cg';
import TerminalTab from '../components/webdetails/TerminalTab';
import ContainerLogTab from '../components/webdetails/ContainerLogTab';
import WebDetailsHeader from '../components/webdetails/WebDetailsHeader';
import RModal from '../components/common/RModal';

const WebDetails = () => {
    const [tabIdx, setTabIdx] = useState(0);
    const { webName } = useParams();
    const {
        loading, getWebByName, singleWeb, onEnvChange,
        addNewEnv, onDeleteEnv, getContainerLogs, containerError,
        rebuildLog
    } = useWeb()

    useEffect(() => {
        if (!webName || webName === null || webName === undefined) return;
        getWebByName(webName)
    }, [getWebByName, webName])

    return (
        <div className="withPadding flexCol gapMD webDetailsPage">

            <WebDetailsHeader />
            <RModal />

            <div className="mainWebGrid">
                <WithLoading classList={"mainBg roundSM withShadow"} min={"200px"} spinnerSize={35} loading={loading?.singleWebLoading}>
                    <div className="webDetailCol1 withShadow roundSM">
                        <div className="webDetailItem">
                            <p className="fw500 head">Name: </p>
                            <p>{singleWeb?.name}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Image: </p>
                            <p>{singleWeb?.image}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Container Id: </p>
                            <p>{singleWeb?.container_id}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Exposed Port: </p>
                            <p>{singleWeb?.exposed_port}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Container Port: </p>
                            <p>{singleWeb?.bind_port}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Host Path: </p>
                            <p>{singleWeb?.host_path}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Hots Url: </p>
                            <Link to={`http://localhost:${singleWeb?.bind_port}`} target='_blank' className='primaryText'>http://localhost:{singleWeb?.bind_port}</Link>
                        </div>
                        <div className="webDetailItem">
                            <WithLoading loading={loading?.containerDetails}>
                                <p className="fw500 head">Container Ip: </p>
                                <p>{singleWeb?.container_detail?.NetworkSettings?.IPAddress || "-"}</p>
                            </WithLoading>
                        </div>
                        <div className="webDetailItem">
                            <WithLoading loading={loading?.containerDetails}>
                                <p className="fw500 head">Status: </p>
                                <p className={`containerStatus ${singleWeb?.container_detail?.State?.Status}`}>{singleWeb?.container_detail?.State?.Status}</p>
                            </WithLoading>
                        </div>
                    </div>
                </WithLoading>

                <div className="webDetailCol2  withShadow roundSM">
                    {
                        containerError.error && containerError.key === "container_not_found" && (
                            <div className='messageBox error withPadding flexCol gapMD'>
                                <h3>Container Not Found</h3>
                                <p>Container not found, check docker if container is deleted or not. Alternatively check if docker is running correctly</p>
                            </div>
                        )
                    }
                    {!containerError.error && (
                        <>
                            <div className="TabMenu scrollX">
                                <p className={`tab ${tabIdx === 0 ? "active" : ""}`} onClick={() => setTabIdx(0)}>Container Details</p>
                                <p className={`tab ${tabIdx === 1 ? "active" : ""}`} onClick={() => setTabIdx(1)}>Terminal</p>
                                <p className={`tab ${tabIdx === 2 ? "active" : ""}`} onClick={() => setTabIdx(2)}>Proxy (Domain)</p>
                                <p className={`tab ${tabIdx === 3 ? "active" : ""}`} onClick={() => setTabIdx(3)}>Environment</p>
                                <p className={`tab ${tabIdx === 4 ? "active" : ""}`}
                                    onClick={() => {
                                        getContainerLogs(singleWeb?.container_id)
                                        setTabIdx(4);
                                    }}>
                                    Logs
                                </p>
                                <p className={`tab ${tabIdx === 5 ? "active" : ""}`} onClick={() => setTabIdx(5)}>Nginx File</p>
                                <p className={`tab ${tabIdx === 6 ? "active" : ""}`} onClick={() => setTabIdx(6)}>Rebuild Log</p>
                            </div>

                            <div className="allTabArea">

                                {/* tab => container details  */}
                                <TabBox show={tabIdx === 0}>
                                    <WithLoading min={"68vh"} spinnerSize={30} loading={loading?.containerDetails}>
                                        <div className='containerDetailTab roundSM '>
                                            <pre>
                                                {JSON.stringify(singleWeb?.container_detail, null, 10)}
                                            </pre>
                                        </div>
                                    </WithLoading>
                                </TabBox>

                                {/* tab => terminal  */}
                                <TabBox show={tabIdx === 1}>
                                    <TerminalTab id={singleWeb?.container_id} />
                                </TabBox>

                                {/* proxy domains  */}
                                <TabBox show={tabIdx === 2}>
                                    <div className="proxyDomainsTab">
                                        <div className="flexRow gapMD">
                                            <IconButton type={"button"} Icon={<AiOutlinePlus size={15} />} text={"Add More"} classList={"secondaryBg roundSM gapSM fontSM"} />
                                        </div>

                                        <div className="proxyDomains">
                                            <p>Sr. No.</p>
                                            <p>Domain</p>
                                            <p>Created At</p>
                                            <p>Action</p>

                                        </div>
                                        <div className="proxyDomains">
                                            <p>1</p>
                                            <p>http://localhost:9000</p>
                                            <p>31th July 2023</p>
                                            <div style={{
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                                cursor: "pointer"
                                            }}>
                                                <AiOutlineDelete size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </TabBox>

                                {/* tab => env variables  */}
                                <TabBox show={tabIdx === 3}>
                                    <div className='envVariableTab'>
                                        <div className="flexRow gapMD">
                                            <IconButton onClick={addNewEnv} type={"button"} Icon={<AiOutlinePlus size={15} />} text={"Add More"} classList={"secondaryBg roundSM gapSM fontSM"} />
                                            <IconButton type={"button"} text={"save"} classList={"primaryBg roundSM gapSM fontSM"} />

                                        </div>
                                        {
                                            singleWeb?.variables &&
                                            singleWeb?.variables.length > 0 &&
                                            singleWeb?.variables.map((env, idx) => (
                                                <div className="envVariables" key={idx}>
                                                    <RInput RClass={"secondaryBg roundSM"} onChange={(e) => onEnvChange(e, "key", idx)} value={env.key} placeholder={"key"} />
                                                    <RInput RClass={"secondaryBg roundSM"} onChange={(e) => onEnvChange(e, "value", idx)} value={env.value} placeholder={"value"} />
                                                    <div className='deleteIcon  secondaryBg' onClick={() => onDeleteEnv(idx)}>
                                                        <CgClose size={18} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </TabBox>

                                {/* tab => container logs  */}
                                <TabBox show={tabIdx === 4}>
                                    <WithLoading height={"70vh"} loading={loading.singleContainerLoading} spinnerSize={30}>
                                        <ContainerLogTab id={singleWeb.container_id} />
                                    </WithLoading>
                                </TabBox>

                                {/* tab => nginx file  */}
                                <TabBox show={tabIdx === 5}></TabBox>

                                {/* tab => nginx file  */}
                                <TabBox show={tabIdx === 6}>
                                    <div className='containerDetailTab roundSM rebuildLogs'>
                                        <pre>
                                            {
                                                rebuildLog &&
                                                rebuildLog.length > 0 &&
                                                rebuildLog.map((rlog) => rlog.message)
                                            }
                                        </pre>
                                    </div>
                                </TabBox>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebDetails