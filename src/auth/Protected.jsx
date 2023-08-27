import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../constants'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Protected = ({ children, reverse }) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get(`${API}/v1/auth/check-login`, {
            withCredentials: true
        })
            .then((res) => {
                const { isLogged } = res.data;

                if (reverse && reverse === true) {
                    if (isLogged) {
                        setTimeout(() => {
                            return navigate('/')
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            return setIsLoggedIn(true)
                        }, 1000);
                    }
                }

                if (isLogged) {
                    setTimeout(() => {
                        return setIsLoggedIn(isLogged)
                    }, 1000);
                } else {
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000)
                    return;
                }
            })
            .catch(() => {
                alert("Something Wrong, Check internet connection")
            })
    }, [navigate, reverse])

    return (
        <>
            {
                isLoggedIn ? children
                    : (
                        <div className='loginPage'>
                            <AiOutlineLoading3Quarters className={"iconLoading"} size={45} />
                        </div>
                    )
            }

        </>
    )
}

export default Protected