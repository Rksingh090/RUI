import React, { createContext, useContext, useState } from 'react'

const webContext = createContext({});

export const useWeb = () => useContext(webContext);

const WebContext = ({ children }) => {

    // all websites 
    const [websites, setWebsites] = useState([]);

    const [githubDeployLogs, setGithubDeployLogs] = useState([]);
    const [fileDeployLogs, setFileDeployLogs] = useState([]);
    const [customDeployLogs, setCustomDeployLogs] = useState([]);


    return (
        <webContext.Provider
            value={{
                websites, setWebsites,
                githubDeployLogs, setGithubDeployLogs,
                fileDeployLogs, setFileDeployLogs,
                customDeployLogs, setCustomDeployLogs
            }}
        >
            {children}
        </webContext.Provider>
    )
}

export default WebContext