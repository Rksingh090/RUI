import React, { useState } from 'react'
import TabBox from '../components/common/TabBox';

import "../styles/docker.css";
import ContainerTab from '../components/docker/ContainerTab';
import ImagesTab from '../components/docker/ImagesTab';


const Docker = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className='fullXY withPadding dockerPage'>
            <div className="TabMenu">
                <p className={`tab ${tabIndex === 0 ? "active" : ""}`} onClick={() => setTabIndex(0)}>Containers</p>
                <p className={`tab ${tabIndex === 1 ? "active" : ""}`} onClick={() => setTabIndex(1)}>Images</p>
                <p className={`tab ${tabIndex === 2 ? "active" : ""}`} onClick={() => setTabIndex(2)}>Volumes</p>
            </div>

            {/* conctainers tab  */}
            <TabBox show={tabIndex === 0}>
                <ContainerTab />
            </TabBox>
            <TabBox show={tabIndex === 1}>
                <ImagesTab />
            </TabBox>
            <TabBox show={tabIndex === 2}>
                <div className="dockerItems">
                    <div className="dockerItem withShadow flexCol gapMD roundSM">
                        <p className="dockerLine">
                            <span>Volume Id: </span>
                            <span>sfsd65fdsg4d5s4g57df54gh5d4f5h7df5h744545sdg5ds4g57sd85g5sdg</span>
                        </p>
                        <p className="dockerLine">
                            <span>Path: </span>
                            <span>/var/lib/docker/volumes</span>
                        </p>
                        <p className="dockerLine">
                            <span>Scope: </span>
                            <span>local</span>
                        </p>
                        <p className="dockerLine">
                            <span>Created At: </span>
                            <span>10 Hours ago</span>
                        </p>
                    </div>
                    <div className="dockerItem withShadow flexCol gapMD roundSM">
                        <p className="dockerLine">
                            <span>Volume Id: </span>
                            <span>sfsd65fd85s4g5sd5g42sd4g587wtkjhk5d4zg8sa7sdg5ds4g57sd85g5sdg</span>
                        </p>
                        <p className="dockerLine">
                            <span>Path: </span>
                            <span>/var/lib/docker/volumes</span>
                        </p>
                        <p className="dockerLine">
                            <span>Scope: </span>
                            <span>local</span>
                        </p>
                        <p className="dockerLine">
                            <span>Created At: </span>
                            <span>2 Days ago</span>
                        </p>
                    </div>
                </div>
            </TabBox>

        </div>
    )
}

export default Docker