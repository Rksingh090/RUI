import React, { useEffect, useState } from 'react'
import "../styles/webdetails.css";
import { Link, useParams } from 'react-router-dom';
import { useWeb } from '../context/WebContext';

// icons 
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

// utilities 
import TabBox from '../components/common/TabBox';
import IconButton from '../components/common/IconButton';
import RInput from '../components/common/RInput';
import WithLoading from '../components/common/WithLoading';
import RModal from '../components/common/RModal';

// tabs 
import TerminalTab from '../components/webdetails/TerminalTab';
import ContainerLogTab from '../components/webdetails/ContainerLogTab';
import WebDetailsHeader from '../components/webdetails/WebDetailsHeader';
import RebuildLogTab from '../components/webdetails/RebuildLogTab';
import ProxyDomainTab from '../components/webdetails/ProxyDomainTab';

const WebDetails = () => {
    const { webName } = useParams();
    const {
        loading, getWebByName, singleWeb, onEnvChange,
        addNewEnv, onDeleteEnv, containerError,
        modalState, changeModalState,
        tabIdx, setTabIdx,
        domainInput, setDomainInput, addProxyDomain,
    } = useWeb()

    const hostName = window.location.hostname;

    const [envData, setEnvData] = useState({
        key: "",
        value: ""
    });

    const onChangeEnv = (e, key) => {
        setEnvData(pre => ({
            ...pre,
            [key]: e.target.value
        }))
    }


    useEffect(() => {
        if (!webName || webName === null || webName === undefined) return;
        getWebByName(webName)
    }, [getWebByName, webName])

    return (
        <div className="withPadding flexCol gapMD webDetailsPage">

            <WebDetailsHeader />

            {/* add new env variable modal */}
            <RModal show={modalState?.envModal} height={"auto"} formClass={"roundMD"}>
                <h4>Add New Env</h4>
                <div className="RGrid">
                    <RInput placeholder={"Key"} RClass={"roundSM secondaryBg"}
                        value={envData?.key} onChange={(e) => onChangeEnv(e, "key")}
                    />
                    <RInput placeholder={"Value"} RClass={"roundSM secondaryBg"}
                        value={envData?.value} onChange={(e) => onChangeEnv(e, "value")}
                    />
                </div>
                <div className="flexRow gapMD" style={{ width: "100%" }}>
                    <IconButton text={"cancle"} classList={"secondaryBg roundSM"} onClick={() => changeModalState({ envModal: false })} />
                    <IconButton text={"save"} classList={"primaryBg roundSM"} onClick={() => addNewEnv(envData)} />
                </div>
            </RModal>


            {/* add new domain (proxy) modal  */}
            <RModal show={modalState.domainModal} height={"auto"} formClass={"roundMD"} width={"350px"}>
                <h4>Add Domain</h4>
                <RInput placeholder={"Domain"} RClass={"roundSM secondaryBg"}
                    value={domainInput} onChange={(e) => setDomainInput(e.target.value)}
                />
                <div className="flexRow gapMD" style={{ width: "100%" }}>
                    <IconButton text={"cancle"} classList={"secondaryBg roundSM"} onClick={() => changeModalState({ domainModal: false })} />
                    <IconButton text={"save"} classList={"primaryBg roundSM"} onClick={() => addProxyDomain()} />
                </div>
            </RModal>

            <div className="mainWebGrid">
                <WithLoading classList={"mainBg roundSM withShadow"} min={"200px"} spinnerSize={40} loading={loading?.singleWebLoading}>
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
                            <p className="fw500 head">Deployed With: </p>
                            <p>{singleWeb?.deploy_with}</p>
                        </div>
                        {singleWeb?.deploy_with === "docker_image" && (
                            <div className="webDetailItem">
                                <p className="fw500 head">Image: </p>
                                <p>{singleWeb?.deploy_source}</p>
                            </div>
                        )}
                        {singleWeb?.deploy_with === "github" && (
                            <div className="webDetailItem">
                                <p className="fw500 head">Git Url:  </p>
                                <p>{singleWeb?.deploy_source}</p>
                            </div>
                        )}

                        <div className="webDetailItem">
                            <p className="fw500 head">Host Path: </p>
                            <p>{singleWeb?.host_path}</p>
                        </div>
                        <div className="webDetailItem">
                            <p className="fw500 head">Hots Url: </p>
                            <Link to={`http://${hostName}:${singleWeb?.bind_port}`} target='_blank' className='primaryText'>http://{hostName}:{singleWeb?.bind_port}</Link>
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
                    {containerError.error && containerError.key === "container_not_found" && (
                        <div className='messageBox error withPadding flexCol gapMD'>
                            <h3>Container Not Found</h3>
                            <p>Container not found, check docker if container is deleted or not. Alternatively check if docker is running correctly</p>
                        </div>
                    )}
                    {!containerError.error && (
                        <>
                            <div className="TabMenu activeBorder scrollX">
                                <p className={`tab small ${tabIdx === 0 ? "active" : ""}`}
                                    onClick={() => { setTabIdx(0); }}>
                                    Logs
                                </p>
                                <p className={`tab small ${tabIdx === 1 ? "active" : ""}`} onClick={() => setTabIdx(1)}>Terminal</p>
                                <p className={`tab small ${tabIdx === 2 ? "active" : ""}`} onClick={() => setTabIdx(2)}>Environment</p>
                                <p className={`tab small ${tabIdx === 3 ? "active" : ""}`} onClick={() => setTabIdx(3)}>Container Details</p>
                                <p className={`tab small ${tabIdx === 4 ? "active" : ""}`} onClick={() => setTabIdx(4)}>Proxy (Domain)</p>
                                <p className={`tab small ${tabIdx === 5 ? "active" : ""}`} onClick={() => setTabIdx(5)}>Nginx File</p>
                                <p className={`tab small ${tabIdx === 6 ? "active" : ""}`} onClick={() => setTabIdx(6)}>Rebuild Log</p>
                            </div>
                            <div className="allTabArea">

                                {/* tab => container logs  */}
                                <TabBox show={tabIdx === 0}>
                                    <WithLoading spinnerSize={40} loading={loading?.singleWebLoading} min={"68vh"}>
                                        <ContainerLogTab id={singleWeb.container_id} />
                                    </WithLoading>
                                </TabBox>

                                {/* tab => terminal  */}
                                <TabBox show={tabIdx === 1}>
                                    <TerminalTab id={singleWeb?.container_id} />
                                </TabBox>

                                {/* tab => env variables  */}
                                <TabBox show={tabIdx === 2}>
                                    <div className='envVariableTab'>
                                        <div className="flexRow gapMD">
                                            <IconButton
                                                onClick={() => changeModalState({ envModal: true })}
                                                type={"button"}
                                                Icon={<AiOutlinePlus size={15} />}
                                                text={"Add More"}
                                                classList={"primaryBg roundSM gapSM fontSM"}
                                            />
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

                                {/* tab => container details  */}
                                <TabBox show={tabIdx === 3}>
                                    <WithLoading min={"68vh"} spinnerSize={30} loading={loading?.containerDetails}>
                                        <div className='containerDetailTab roundSM '>
                                            <pre>
                                                {JSON.stringify(singleWeb?.container_detail, null, 10)}
                                            </pre>
                                        </div>
                                    </WithLoading>
                                </TabBox>

                                {/* proxy domains  */}
                                <TabBox show={tabIdx === 4}>
                                    <ProxyDomainTab />
                                </TabBox>

                                {/* tab => nginx file  */}
                                <TabBox show={tabIdx === 5}></TabBox>

                                {/* tab => nginx file  */}
                                <TabBox show={tabIdx === 6}>
                                    <RebuildLogTab />
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