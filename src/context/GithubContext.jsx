import React, { useCallback, useEffect, useState } from 'react'
import { createContext, useContext } from "react";

import axios from 'axios';
import { API } from '../constants';

const gitContext = createContext();

export const useGithub = () => useContext(gitContext);

const GithubContext = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfigured, setIsConfigured] = useState(false);


    const [allRepositories, setAllRepositories] = useState({
        loaded: false,
        data: []
    })

    // get all repos 
    const getAllRepositories = useCallback(() => {
        setIsLoading(true)
        axios.get(`${API}/v1/git/repositories`, {
            withCredentials: true
        }).then((res) => {
            const { error, repositories, configured } = res.data;
            if (error === false) {
                setAllRepositories({
                    loaded: true,
                    data: repositories
                })
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

    const getGitConfig = () => {
        axios.get(`${API}/v1/git/check-configuration`, {
            withCredentials: true
        }).then((res) => {
            const { status, configured } = res.data;
            if (status === "success") {
                setIsConfigured(configured)
            }
        })
            .catch((err) => {
                console.log(err?.response?.data);
            })
    }

    useEffect(() => {
        getGitConfig()
    }, [])

    return (
        <gitContext.Provider value={{
            // git states
            allRepositories, setAllRepositories,
            isConfigured, isLoading,

            // git func 
            getAllRepositories, getGitConfig
        }}>
            {children}
        </gitContext.Provider>
    )
}

export default GithubContext