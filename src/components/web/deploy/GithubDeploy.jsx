import React, { useEffect, useRef, useState } from 'react'

// components 
import RInput from '../../common/RInput'
import IconButton from '../../common/IconButton'

// icons 
import { CgClose } from 'react-icons/cg'
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai'
import { useWeb } from '../../../context/WebContext'

const GithubDeploy = () => {


  const { githubDeployLogs, deployGithubApp, loading } = useWeb()

  const [templateData, setTemplateData] = useState({
    name: "",
    github_url: "",
    exposed_port: "",
    environments: [{
      key: "",
      value: ""
    }]
  })


  const onAddEnv = () => {
    setTemplateData(prev => ({
      ...prev,
      environments: [
        ...prev.environments,
        {
          key: "",
          value: ""
        }
      ]
    }))
  }

  const setEnvName = (e, idx) => {
    let envs = templateData.environments;
    envs[idx].key = e.target.value;
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

  const onDeployGithub = (e) => {
    e.preventDefault();
    deployGithubApp(templateData)
  }

  const messagesEndRef = useRef(null);
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    scrollToBottom()
  }, [githubDeployLogs?.length])

  return (
    <div className="templateDeployPage">
      <div className="deployGrid">
        <form className='templateDeployForm ' onSubmit={onDeployGithub}>
          <RInput
            RClass={"roundSM withShadow"}
            placeholder={"Web Name"}
            value={templateData.name}
            onChange={(e) => setTemplateData(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />

          <RInput
            RClass={"roundSM withShadow "}
            placeholder={"Github Url"}
            value={templateData.github_url}
            onChange={(e) => setTemplateData(prev => ({
              ...prev,
              github_url: e.target.value
            }))}
          />

          <RInput
            RClass={"roundSM withShadow "}
            placeholder={"Exposed Port"}
            value={templateData.exposed_port}
            onChange={(e) => setTemplateData(prev => ({
              ...prev,
              exposed_port: e.target.value
            }))}
          />

          <div className='envVarHead'>
            <p>Environment Variables</p>
            <IconButton onClick={onAddEnv} type={"button"} Icon={<AiOutlinePlus size={15} />} text={"Add More"} classList={"withShadow roundSM gapSM fontSM"} />
          </div>
          {
            templateData.environments &&
            templateData.environments.map((env, idx) => (
              <div className="envVariables" key={idx}>
                <RInput RClass={"roundSM withShadow "} value={env.key} onChange={(e) => setEnvName(e, idx)} placeholder={"key"} />
                <RInput RClass={"roundSM withShadow"} value={env.value} onChange={(e) => setEnvVal(e, idx)} placeholder={"value"} />
                <div className='deleteIcon withShadow' onClick={() => deleteThis(idx)}>
                  <CgClose size={18} />
                </div>
              </div>
            ))
          }
          <IconButton type={"submit"} loading={loading.githubLoading} text={"Deploy"} classList={"withShadow roundSM primaryBg gapMD"} Icon={<AiOutlineCloudUpload size={20} />} />

        </form>

        <div className="templateOutput roundSM withShadow">
          <IconButton loading={loading.githubLoading} classList={"gapMD noPad noBg"} text={"Deploy Log"} />
          <div className="output">
            {
              githubDeployLogs &&
              githubDeployLogs.length > 0 &&
              githubDeployLogs.map((stdOut, idx) => (
                <p key={idx}>{stdOut?.message}</p>
              ))
            }
            <span ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GithubDeploy