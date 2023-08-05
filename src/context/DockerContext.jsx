import React, { useCallback, useState } from 'react'
import { createContext, useContext } from "react";

import axios from 'axios';
import { API } from '../constants';

const dockerContext = createContext();

export const useDocker = () => useContext(dockerContext);

const DockerContext = ({ children }) => {

    const [loading, setLoading] = useState({
        containerLoading: false,
        imageLoading: false,
        volumeLoading: false,
    });

    const [allContainers, setAllContainers] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [allVolumes, setAllVolumes] = useState([]);

    const getAllContainers = useCallback(() => {
        setLoadinData({ containerLoading: true })
        axios.get(`${API}/v1/docker/all-container`)
            .then((res) => {
                const { status, containers } = res.data;
                if (status === "success") {
                    setAllContainers(containers);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoadinData({ containerLoading: false })
            });
    }, []);

    const getAllImages = useCallback(() => {
        setLoadinData({ imageLoading: true })
        axios.get(`${API}/v1/docker/all-images`)
            .then((res) => {
                const { status, images } = res.data;
                if (status === "success") {
                    setAllImages(images);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoadinData({ imageLoading: false })
            });
    }, []);

    const getAllVolumes = useCallback(() => {
        setLoadinData({ volumeLoading: true })
        axios.get(`${API}/v1/docker/all-volumes`)
            .then((res) => {
                const { status, volumes } = res.data;
                if (status === "success") {
                    setAllVolumes(volumes);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoadinData({ volumeLoading: false })
            });
    }, []);

    const setLoadinData = (data) => {
        setLoading(prev => ({
            ...prev,
            ...data
        }))
    }

    return (
        <dockerContext.Provider value={{
            loading,

            // container action 
            allContainers,
            getAllContainers,

            // image action 
            allImages,
            getAllImages,

            allVolumes,
            getAllVolumes

        }}>
            {children}
        </dockerContext.Provider>
    )
}

export default DockerContext