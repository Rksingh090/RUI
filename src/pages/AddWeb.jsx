import React, { useState } from 'react'
import TabBox from '../components/common/TabBox';
import TemplateDeployTab from '../components/web/TemplateDeployTab';
import FileDeployTab from '../components/web/FileDeployTab';
import GithubDeployTab from '../components/web/GithubDeployTab';
import TemplateDeployForm from '../components/web/TemplateDeployForm';

const AddWeb = () => {

  const [tabIdx, setTabIdx] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const onSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName)
    setTabIdx(3);
  }

  return (
    <div className="fullXY withPadding flexCol gapSM">
      <div className="TabMenu">
        <p className={`tab ${tabIdx === 0 ? "active" : ""}`} onClick={() => setTabIdx(0)}>Deploy Template</p>
        <p className={`tab ${tabIdx === 1 ? "active" : ""}`} onClick={() => setTabIdx(1)}>Deploy from Github </p>
        <p className={`tab ${tabIdx === 2 ? "active" : ""}`} onClick={() => setTabIdx(2)}>Deploy from Folder</p>
        <p className={`tab ${tabIdx === 3 ? "active" : ""}`} onClick={() => setTabIdx(3)}>Custom Template</p>
      </div>

      <TabBox show={tabIdx === 0}>
        <TemplateDeployTab onSelectTemplate={onSelectTemplate} />
      </TabBox>
      <TabBox show={tabIdx === 1}>
        <GithubDeployTab />
      </TabBox>
      <TabBox show={tabIdx === 2}>
        <FileDeployTab />
      </TabBox>
      <TabBox show={tabIdx === 3}>
        <TemplateDeployForm templateImg={selectedTemplate} />
      </TabBox>
    </div>
  )
}

export default AddWeb