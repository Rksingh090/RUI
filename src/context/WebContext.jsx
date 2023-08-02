import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WS_URL } from '../constants';
import axios from 'axios';
import { API } from '../constants';

const webContext = createContext({});

export const useWeb = () => useContext(webContext);

const WebContext = ({ children }) => {

    // websocket connection for all web related msg 
    const ws = useMemo(() => new WebSocket(`${WS_URL}/webws`), [])

    // is rebuilding 
    const [isRebuilding, setIsRebuilding] = useState(false)

    // loading state 
    const [loading, setLoading] = useState({
        allWebsiteLoading: false,
        githubLoading: false,
        fileLoading: false,
        customLoading: false,
        generalLoading: false,
        singleWebLoading: false,
        containerDetails: false,
        singleContainerLoading: true
    })

    // loading state 
    const [modalState, setModalState] = useState({
        envModal: false
    })

    // all websites 
    const [websites, setWebsites] = useState([]);

    const [singleWeb, setSingleWeb] = useState({});

    // logs 
    const [rebuildLog, setRebuildLog] = useState([]);
    const [githubDeployLogs, setGithubDeployLogs] = useState([]);
    const [fileDeployLogs, setFileDeployLogs] = useState([]);
    const [customDeployLogs, setCustomDeployLogs] = useState([]);
    const [generalLogs, setGeneralLogs] = useState([]);

    // single container
    const [containerLog, setContainerLog] = useState("");
    const [containerError, setContainerError] = useState({
        error: false
    });

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
                changeModalState({ envState: false })
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

    //Convert to html 
    const getContainerLogs = (containerId) => {
        if (!containerId || containerId === undefined) return;
        setLoadingData({ singleContainerLoading: true })
        axios
            .get(`${API}/v1/docker/container-logs/${containerId}`)
            .then((res) => {
                const { status, log } = res.data;

                if (status === "success") {
                    setContainerLog(log);
                }
            })
            .catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoadingData({ singleContainerLoading: false })
            })
    };

    const rebuildWebsite = () => {
        setIsRebuilding(true)
        axios.post(`${API}/v1/web/rebuild-web`, {
            name: singleWeb.name
        }).then((res) => {
            const {status, container_id} = res.data;
            if(status === "success"){
                setSingleWeb(prev => ({
                    ...prev,
                    container_id
                }))
            }
            console.log(res.data)
        })
        .finally(() => {
            setIsRebuilding(false)
        })
    }



    return (
        <webContext.Provider
            value={{
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
                containerLog, setContainerLog,
                getContainerLogs,
                containerError,

                // modal state 
                modalState, changeModalState,

                // rebuilding state 
                rebuildWebsite,
                isRebuilding, setIsRebuilding

            }}
        >
            {children}
        </webContext.Provider>
    )
}

export default WebContext