import React, { useEffect, useMemo, useState } from 'react'

import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

import RInput from '../../common/RInput';
import IconButton from '../../common/IconButton';
import { availableTemplates } from '../../../config/templates';
import { useSearchParams } from 'react-router-dom';

import { WS_URL } from '../../../constants';

const CustomDeploy = () => {
    const ws = useMemo(() => new WebSocket(`${WS_URL}/webws`), [])

    const [searchParams, setSearchParams] = useSearchParams();
    const [templateData, setTemplateData] = useState({
        name: "",
        image: "",
        environments: [{
            name: "",
            value: ""
        }],
        exposed_ports: ""
    })

    const [stdOutputs, setStdOutputs] = useState([]);

    useEffect(() => {
        let template = searchParams.get("template");
        if (!searchParams || !template || template === "") return;
        let getTemplate = availableTemplates.filter((item) => item.name === template);
        if (getTemplate.length <= 0) {
            alert("Template not found");
        }
        setTemplateData(getTemplate[0])
    }, [searchParams])


    const onAddEnv = () => {
        setTemplateData(prev => ({
            ...prev,
            environments: [
                ...prev.environments,
                {
                    name: "",
                    value: ""
                }
            ]
        }))
    }

    const setEnvName = (e, idx) => {
        let envs = templateData.environments;
        envs[idx].name = e.target.value;
        setTemplateData(prev => ({
            ...prev,
            environments: envs
        }))
    }
    const setEnvVal = (e, idx) => {
        let envs = templateData.environments;
        envs[idx].value = e.target.value;
        setTemplateData(prev => ({
            ...prev,
            environments: envs
        }))
    }
    const deleteThis = (envIdx) => {
        let envs = templateData.environments.filter((_, idx) => idx !== envIdx);
        setTemplateData(prev => ({
            ...prev,
            environments: envs
        }))
    }



    ws.onopen = (e) => {
        console.log("Connection Opened.");
    }
    ws.onmessage = (e) => {
        const { data } = e;
        
        if (!data || data === null) return;

        let parsedData = JSON.parse(data);
        console.log(parsedData);

        setStdOutputs(prev => [
            ...prev,
            parsedData
        ])
    }

    ws.onclose = (e) => {
        console.log("Connection Closed.");
    }

    return (
        <div className="templateDeployPage">
            <div className="deployGrid">
                <form className='templateDeployForm '>
                    <RInput
                        value={templateData.name}
                        onChange={(e) => setTemplateData(prev => ({
                            ...prev,
                            name: e.target.value
                        }))}
                        RClass={"roundSM withShadow "}
                        placeholder={"Web Name"}
                    />
                    <RInput value={templateData.image}
                        onChange={(e) => setTemplateData(prev => ({
                            ...prev,
                            image: e.target.value
                        }))}
                        RClass={"roundSM withShadow "} placeholder={"Image"} />
                    <RInput
                        value={templateData.exposed_ports}
                        onChange={(e) => setTemplateData(prev => ({
                            ...prev,
                            exposed_ports: e.target.value
                        }))}
                        RClass={"roundSM withShadow "} placeholder={"Exposed Port"} />
                    <div className='envVarHead'>
                        <p>Environment Variables</p>
                        <IconButton onClick={onAddEnv} type={"button"} Icon={<AiOutlinePlus size={15} />} text={"Add More"} classList={"withShadow roundSM gapSM fontSM"} />
                    </div>
                    {
                        templateData.environments &&
                        templateData.environments.map((env, idx) => (
                            <div className="envVariables" key={idx}>
                                <RInput RClass={"roundSM withShadow "} value={env.name} onChange={(e) => setEnvName(e, idx)} placeholder={"key"} />
                                <RInput RClass={"roundSM withShadow "} value={env.value} onChange={(e) => setEnvVal(e, idx)} placeholder={"value"} />
                                <div className='deleteIcon withShadow' onClick={() => deleteThis(idx)}>
                                    <CgClose size={18} />
                                </div>
                            </div>
                        ))
                    }
                    <IconButton type={"submit"} text={"Deploy"} classList={"withShadow roundSM primaryBg gapMD"} Icon={<AiOutlineCloudUpload size={20} />} />
                </form>

                <div className="templateOutput roundSM withShadow">
                    <p>Deploy Log</p>
                    <div className="output">
                        {
                            stdOutputs &&
                            stdOutputs.length > 0 &&
                            stdOutputs.map((stdOut, idx) => (
                                <p key={idx}>{stdOut?.message}</p>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CustomDeploy