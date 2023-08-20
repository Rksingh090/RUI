import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WS_URL } from '../constants';
import axios from 'axios';
import { API } from '../constants';

const webContext = createContext({});

export const useWeb = () => useContext(webContext);

const WebContext = ({ children }) => {

    // websocket connection for all web related msg 
    const ws = useMemo(() => new WebSocket(`${WS_URL}/v1/webws`), [])

    const [tabIdx, setTabIdx] = useState(0);

    // loading state 
    const [loading, setLoading] = useState({
        allWebsiteLoading: false,
        githubLoading: false,
        fileLoading: false,
        customLoading: false,
        generalLoading: false,
        singleWebLoading: false,
        containerDetails: false
    })

    // action loading (web header actions)
    const [actionLoading, setActionLoading] = useState({
        rebuilding: false,
        restarting: false,
        starting: false,
        stoping: false,
        deleting: false
    })

    // loading state 
    const [modalState, setModalState] = useState({
        envModal: false,
        domainModal: false
    })

    // all websites 
    const [websites, setWebsites] = useState([]);

    // one website data 
    const [singleWeb, setSingleWeb] = useState({});

    // logs 
    const [rebuildLog, setRebuildLog] = useState([]);
    const [githubDeployLogs, setGithubDeployLogs] = useState([]);
    const [fileDeployLogs, setFileDeployLogs] = useState([]);
    const [customDeployLogs, setCustomDeployLogs] = useState([]);
    const [generalLogs, setGeneralLogs] = useState([]);

    // single container
    const [containerError, setContainerError] = useState({
        error: false
    });

    const [domainInput, setDomainInput] = useState("");

    // on ws open 
    ws.onopen = (e) => {
        console.log("Connection Opened.");
    }

    // recieve message
    ws.onmessage = (e) => {
        const { data } = e;

        if (!data || data === null) return;

        let parsedData = JSON.parse(data);
        switch (parsedData.type) {
            case "fileDeploy":
                setFileDeployLogs(prev => [
                    ...prev, parsedData
                ])
                break;
            case "githubDeploy":
                setGithubDeployLogs(prev => [
                    ...prev, parsedData
                ])
                break;
            case "templateDeploy":
                setCustomDeployLogs(prev => [
                    ...prev, parsedData
                ])
                break;
            case "rebuild":
                setRebuildLog(prev => [
                    ...prev, parsedData
                ])
                break;
            default:
                setGeneralLogs(prev => [
                    ...prev, parsedData
                ])
                break;
        }
    }

    // user diconnected: closed connection
    ws.onclose = (e) => {
        console.log("Connection Closed.");
    }

    // dispose ws on unmount 
    useEffect(() => {
        return () => ws.close()
    }, [ws])

    // set loading state 
    const setLoadingData = (data) => {
        setLoading(prev => ({
            ...prev,
            ...data
        }))
    }

    // deploy custom template
    const deployTemplateApp = (data) => {

        if (!data.name || data.name === "") return;
        if (!data.image || data.image === "") return;
        if (!data.exposed_port || data.exposed_port === "") return;

        setLoadingData({ customLoading: true })
        setCustomDeployLogs([]);

        axios.post(`${API}/v1/web/template-deploy`, {
            variables: data.environments,
            exposed_port: String(data.exposed_port),
            host_port: String(data.host_port),
            image: data.image,
            name: data.name
        })
            .then((res) => {
                const { status, message } = res.data;
                if (status === "success") {
                    alert(message)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoadingData({ customLoading: false })
            })
    }

    // deploat github app 
    const deployGithubApp = (data) => {
        if (!data.name || data.name === "") return;
        if (!data.github_url || data.github_url === "") return;
        if (!data.exposed_port || data.exposed_port === "") return;

        setLoadingData({ githubLoading: true })
        setGithubDeployLogs([]);

        axios.post(`${API}/v1/web/github-deploy`, {
            variables: data.environments,
            exposed_port: String(data.exposed_port),
            host_port: String(data.host_port),
            url: data.github_url,
            name: data.name
        })
            .then((res) => {
                const { status, message } = res.data;
                if (status === "success") {
                    alert(message)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoadingData({ githubLoading: false })
            })
    }

    // get lits of all websites 
    const getAllWebsiteList = useCallback(() => {
        setLoadingData({ allWebsiteLoading: true })
        axios.get(`${API}/v1/web/get-all`)
            .then((res) => {
                const { status, websites } = res.data;
                if (status === "success") {
                    setWebsites(websites)
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoadingData({ allWebsiteLoading: false })
            })
    }, []);

    useEffect(() => {
        getAllWebsiteList();
    }, [getAllWebsiteList])

    const getContainerById = useCallback((containerId) => {
        if (!containerId || containerId === "" || containerId === undefined) {
            setLoadingData({ containerDetails: false })
            return
        };
        if (singleWeb.container_detail && singleWeb?.container_detail !== undefined && singleWeb.container_detail !== null) {
            setLoadingData({ containerDetails: false })
            return;
        };
        axios.get(`${API}/v1/docker/container-details/${containerId}`)
            .then((res) => {
                const { status, container } = res.data;
                if (status === "success") {
                    setSingleWeb(prev => ({
                        ...prev,
                        container_detail: container
                    }))
                }
            })
            .catch((err) => {
                const { data } = err.response;
                setContainerError({
                    error: true,
                    ...data
                })
            })
            .finally(() => {
                setLoadingData({ containerDetails: false })
            })
    }, [])

    const getWebByName = useCallback((webName) => {
        setLoadingData({ singleWebLoading: true, containerDetails: true })
        setContainerError({ error: false })
        axios.get(`${API}/v1/web/get-web/${webName}`)
            .then((res) => {
                const { status, web } = res.data;
                if (status === "success") {
                    setSingleWeb(web)
                    getContainerById(web.container_id)
                } else {
                    setLoadingData({ containerDetails: false })
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoadingData({ singleWebLoading: false })
            })
    }, [])

    // edit env login 
    const onEnvChange = (e, key, idx) => {
        let allEnv = singleWeb.variables;
        if (key === "key") {
            allEnv[idx].key = e.target.value;
        } else {
            allEnv[idx].value = e.target.value;
        }
        setSingleWeb(prev => ({
            ...prev,
            variables: allEnv
        }))
    }

    // change modal state 
    const changeModalState = (data) => {
        setModalState(prev => ({
            ...prev,
            ...data
        }))
    }

    const changeActionLoading = (data) => {
        setActionLoading(prev => ({
            ...prev,
            ...data
        }))
    }

    // add new env 
    const addNewEnv = (data) => {
        axios.post(`${API}/v1/web/add-variable`, { id: singleWeb?._id, variables: data })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    setSingleWeb(pre => ({
                        ...pre,
                        variables: [...pre.variables, data]
                    }))
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                changeModalState({ envModal: false })
            })
    }

    // on delete env 
    const onDeleteEnv = (idx) => {
        const filteredEnv = singleWeb.variables?.filter((_, itemIdx) => itemIdx !== idx);
        setSingleWeb(prev => ({
            ...prev,
            variables: filteredEnv
        }))
    }

    // rebuild website 
    const rebuildContainer = () => {
        changeActionLoading({ rebuilding: true })
        setLoadingData({ singleWebLoading: true, containerDetails: true })

        setRebuildLog([]);
        setTabIdx(6);

        axios.post(`${API}/v1/web/rebuild-web`, {
            name: singleWeb.name
        }).then((res) => {
            const { status, message, container_id } = res.data;
            if (status === "success") {
                setSingleWeb(prev => ({
                    ...prev,
                    container_id
                }))

                alert(message)
            }
            console.log(res.data)
        })
            .finally(() => {
                changeActionLoading({ rebuilding: false })
                setLoadingData({ singleWebLoading: false, containerDetails: false })
            })
    }

    // restart container 
    const restartContainer = () => {
        changeActionLoading({ restarting: true })

        axios.post(`${API}/v1/docker/restart-container`, {
            id: singleWeb.container_id
        }).then((res) => {
            console.log(res.data)
        })
            .finally(() => {
                changeActionLoading({ restarting: false })
            })
    }

    // start container 
    const startContainer = () => {
        changeActionLoading({ starting: true })
        axios.post(`${API}/v1/docker/start-container`, {
            id: singleWeb.container_id
        }).then((res) => {
            const { status } = res.data;
            if (status === "success") {
                setSingleWeb(prev => ({
                    ...prev,
                    container_detail: {
                        ...prev.container_detail,
                        State: {
                            ...prev.container_detail.State,
                            Status: "running"
                        }
                    }
                }))
            }
            console.log(res.data)
        })
            .finally(() => {
                changeActionLoading({ starting: false })
            })
    }

    // stop container 
    const stopContainer = () => {
        changeActionLoading({ stoping: true })
        axios.post(`${API}/v1/docker/stop-container`, {
            id: singleWeb.container_id
        }).then((res) => {
            const { status } = res.data;
            if (status === "success") {
                setSingleWeb(prev => ({
                    ...prev,
                    container_detail: {
                        ...prev.container_detail,
                        State: {
                            ...prev.container_detail.State,
                            Status: "exited"
                        }
                    }
                }))
            }
            console.log(res.data)
        })
            .finally(() => {
                changeActionLoading({ stoping: false })
            })

    }

    // delete web 
    const deleteWebsite = () => {
        changeActionLoading({ deleting: true })
        axios.post(`${API}/v1/web/delete-web`, {
            name: singleWeb.name
        }).then((res) => {
            const { status } = res.data;
            if (status === "success") {
                window.location.href = "/web"
            }
            console.log(res.data)
        })
            .finally(() => {
                changeActionLoading({ deleting: false })
            })
    }

    // create proxy 
    const addProxyDomain = () => {
        axios.post(`${API}/v1/proxy/create-proxy/${singleWeb?._id}`, {
            domain: domainInput
        })
            .then((res) => {
                const { status, data } = res.data;
                if (status === "success") {
                    setSingleWeb(prev => ({
                        ...prev,
                        domains: [
                            ...prev.domains,
                            data
                        ]
                    }))
                }
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => {
                changeModalState({ domainModal: false })
            })

    }

    const deleteProxyDomain = (domainId) => {
        axios.patch(`${API}/v1/proxy/delete-proxy/${singleWeb?._id}`, {
            _id: domainId
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    let domains = singleWeb.domains.filter((domain) => domain._id !== domainId);
                    setSingleWeb(prev => ({
                        ...prev,
                        domains
                    }))
                }
            }).catch(err => {
                console.warn(err);
            })
    }

    const eneableSSL = () => {

    }


    return (
        <webContext.Provider
            value={{
                // tab index 
                tabIdx, setTabIdx,


                // data 
                websites, setWebsites,
                singleWeb, setSingleWeb,

                // logs 
                githubDeployLogs,
                fileDeployLogs,
                customDeployLogs,
                generalLogs,
                rebuildLog,

                // loading 
                loading, setLoadingData,

                // deploy func 
                deployTemplateApp,
                deployGithubApp,

                // data fetch methods 
                getWebByName,

                // customize func 
                onEnvChange,
                addNewEnv,
                onDeleteEnv,

                // container logs 
                containerError,

                // modal state 
                modalState, changeModalState,

                // rebuilding state 
                rebuildContainer,
                startContainer,
                restartContainer,
                stopContainer,
                deleteWebsite,

                // action loadings 
                actionLoading, changeActionLoading,

                // domain states 
                domainInput, setDomainInput,
                addProxyDomain, deleteProxyDomain,

                // ssl settings 
                eneableSSL,
            }}
        >
            {children}
        </webContext.Provider>
    )
}

export default WebContext