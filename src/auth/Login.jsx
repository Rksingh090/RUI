import React, { useState } from 'react';
import '../styles/auth.css';
import RInput from '../components/common/RInput';
import IconButton from '../components/common/IconButton';

import { AiOutlineLogin } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BiLockAlt } from 'react-icons/bi';
import axios from 'axios';
import { API } from '../constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const loginUser = (e) => {
        e.preventDefault();
        axios.post(`${API}/v1/auth/login`, user, {
            withCredentials: true
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    navigate("/")
                }
            })
            .catch((err) => {
                alert(err.response?.data?.message)
            })
    }

    return (
        <div className='loginPage'>
            <form className="loginForm withShadow" onSubmit={loginUser}>
                <h3 className='loginFormHeading'>🚀 RPanel Login 🚀</h3>
                <RInput
                    placeholder={"Username"}
                    RClass={"secondaryBg roundSM loginInput"}
                    Icon={<MdOutlineAlternateEmail size={20} />}
                    value={user.username}
                    onChange={(e) => setUser(prev => ({
                        ...prev,
                        username: e.target.value
                    }))}
                />
                <RInput
                    placeholder={"Password"}
                    RClass={"secondaryBg roundSM loginInput"}
                    Icon={<BiLockAlt size={20} />}
                    value={user.password}
                    onChange={(e) => setUser(prev => ({
                        ...prev,
                        password: e.target.value
                    }))}
                />
                <IconButton type={"submit"} loadingSize={22} text={"Login"} Icon={<AiOutlineLogin size={22} />} classList={"primaryBg loginBtn roundSM"} />
            </form>
        </div>
    )
}

export default Login