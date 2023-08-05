import React, { useState } from 'react'
import TabBox from '../components/common/TabBox';

import "../styles/docker.css";
import ContainerTab from '../components/docker/ContainerTab';
import ImagesTab from '../components/docker/ImagesTab';
import VolumeTab from '../components/docker/VolumeTab';


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
                <VolumeTab />
            </TabBox>

        </div>
    )
}

export default Docker