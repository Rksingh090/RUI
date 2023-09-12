import React, { useCallback, useState } from 'react'
import { createContext, useContext } from "react";

import axios from 'axios';
import { API } from '../constants';

const gitContext = createContext();

export const useGithub = () => useContext(gitContext);

const GithubContext = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfigured, setIsConfigured] = useState(false);

    const [repoLoaded, setRepoLoaded] = useState(false)

    const [allRepositories, setAllRepositories] = useState([])

    const getAllRepositories = useCallback(() => {
        setIsLoading(true)
        axios.get(`${API}/v1/git/repositories`, {
            withCredentials: true
        }).then((res) => {
            const { error, repositories, configured } = res.data;
            if (error === false) {
                setAllRepositories(repositories)
                setRepoLoaded(true)
            }
            setIsConfigured(configured && configured === true);
        })
            .catch((err) => {
                console.log(err?.response?.data);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    const getGitConfig = useCallback(() => {
        axios.get(`${API}/v1/git/get-config`, {
            withCredentials: true
        }).then((res) => {
            const { status, config } = res.data;
            if (status === "success") {
                setIsConfigured(config)
            }
        })
            .catch((err) => {
                console.log(err?.response?.data);
            })
    })

    return (
        <gitContext.Provider value={{
            // git states
            allRepositories, setAllRepositories,
            isConfigured, isLoading, repoLoaded,

            // git func 
            getAllRepositories, getGitConfig
        }}>
            {children}
        </gitContext.Provider>
    )
}

export default GithubContext