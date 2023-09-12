import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { API } from '../constants';

import '../styles/github.css'
import IconButton from '../components/common/IconButton';

const GithubSetup = () => {

    const [URLSearchParam, setURLSearchParam] = useSearchParams()

    const [disable, setDisable] = useState(true)

    useEffect(() => {

        if (URLSearchParam) {
            const installmentId = URLSearchParam.get("installation_id")

            axios.post(`${API}/v1/git/setup`, {
                installation_id: Number(installmentId)
            }, {
                withCredentials: true
            })
                .then((res) => {
                    const { error, message } = res.data;
                    if (error && error === true) {
                        console.error(message);
                    } else {
                        console.log(message);
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setDisable(false)
                        // window.opener.hello()
                    }, 1000)
                })
        }
    }, [URLSearchParam])

    return (
        <div className='gitHubConfigurePage' >
            {
                !disable ?
                    <h2>🚀 Github Configured successfully 🚀</h2>
                    :
                    <h2>Setting Up Github ...</h2>
            }
            {
                !disable &&
                <p className='githubConfiguredMessage'>Now you can close this window. All looks good 👍</p>
            }
            <IconButton
                onClick={() => window.close()}
                loading={disable}
                classList={"fontLG gapMD round withShadow primaryBg hoverError"}
                text={"Close This Window"}
            />
        </div>
    )
}

export default GithubSetup