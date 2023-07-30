import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import TabBox from '../components/common/TabBox';
import DeployTemplates from '../components/web/deploy/DeployTemplates';
import GithubDeploy from '../components/web/deploy/GithubDeploy';
import FileDeploy from '../components/web/deploy/FileDeploy';
import CustomDeploy from '../components/web/deploy/CustomDeploy';

const AddWeb = () => {

  const { hash } = useLocation()
  const [tabIdx, setTabIdx] = useState(0);

  useEffect(() => {
    if (hash && hash === "") return;
    switch (hash) {
      case "#templates":
        setTabIdx(0);
        break;
      case "#github-deploy":
        setTabIdx(1);
        break;
      case "#file-deploy":
        setTabIdx(2);
        break;
      case "#custom-deploy":
        setTabIdx(3);
        break;
      default:
        break;
    }
  }, [hash])

  return (
    <div className="fullXY withPadding flexCol gapSM">
      <div className="TabMenu">
        <Link className={`tab ${tabIdx === 0 ? "active" : ""}`} to={"/add/web/#templates"}>Deploy Template</Link>
        <Link className={`tab ${tabIdx === 1 ? "active" : ""}`} to={"/add/web/#github-deploy"}>Deploy from Github </Link>
        <Link className={`tab ${tabIdx === 2 ? "active" : ""}`} to={"/add/web/#file-deploy"}>Deploy from Folder</Link>
        <Link className={`tab ${tabIdx === 3 ? "active" : ""}`} to={"/add/web/#custom-deploy"}>Custom Template</Link>
      </div>

      <TabBox show={tabIdx === 0}>
        <DeployTemplates />
      </TabBox>
      <TabBox show={tabIdx === 1}>
        <GithubDeploy />
      </TabBox>
      <TabBox show={tabIdx === 2}>
        <FileDeploy />
      </TabBox>
      <TabBox show={tabIdx === 3}>
        <CustomDeploy />
      </TabBox>
    </div>
  )
}

export default AddWeb