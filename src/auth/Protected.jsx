import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../constants'
import { useNavigate } from 'react-router-dom'

const Protected = ({ children, reverse }) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get(`${API}/v1/auth/check-login`, {
            withCredentials: true
        })
            .then((res) => {
                const { isLogged } = res.data;

                if(reverse && reverse === true){
                    if (isLogged) {
                        return navigate('/')
                    } else {
                        return setIsLoggedIn(true)
                    }
                }

                if (isLogged) {
                    return setIsLoggedIn(isLogged)
                } else {
                    return navigate('/login')
                }
            })
            .catch(() => {
                alert("Something Wrong, Check internet connection")
            })
    }, [])

    return (
        <>
            {
                isLoggedIn ? children
                    : (
                        <h2>Loading...</h2>
                    )
            }

        </>
    )
}

export default Protected