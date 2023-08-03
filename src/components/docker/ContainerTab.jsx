import React, { useEffect } from 'react'
import { useDocker } from '../../context/DockerContext';

const ContainerTab = () => {
    const { getAllContainers, allContainers } = useDocker()
    useEffect(() => {
        getAllContainers();
    }, [getAllContainers])
    return (
        <div className="dockerItems">
            {
                allContainers &&
                allContainers.length > 0 &&
                allContainers.map((cdata) => {
                    let containerName = "N/A";

                    let borderTop = "errorBorderTop";
                    let statusClass = "errorText";
                    if (cdata.State === "running") {
                        borderTop = "successBorderTop";
                        statusClass = "successText";
                    } else if (cdata.State === "restarting") {
                        borderTop = "infoBorderTop";
                        statusClass = "infoText";
                    }

                    if(cdata.Names[0] && cdata.Names[0].length > 1) {
                        containerName = String(cdata?.Names[0]).substring(1, cdata.Names[0].length) 
                    }

                    return (
                        <div key={cdata?.Id} className={`dockerItem withShadow flexCol gapMD ${borderTop} roundSM`}>
                            <h3 className='primaryText'>{containerName || "N/A"}</h3>
                            <p className="dockerLine">
                                <span>Container Id: </span>
                                <span>{cdata?.Id}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Image: </span>
                                <span>{cdata?.Image}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Uptime: </span>
                                <span>{cdata?.Status}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Status: </span>
                                <span className={statusClass}>{cdata?.State}</span>
                            </p>
                        </div>

                    )
                })
            }

            {/* <p style={{ whiteSpace: "pre" }}>{JSON.stringify(allContainers, null, 10)}</p> */}
        </div>

    )
}

export default ContainerTab