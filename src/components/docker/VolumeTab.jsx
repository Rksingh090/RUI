import React, { useEffect } from 'react'
import { useDocker } from '../../context/DockerContext'
import { formatSizeUnits } from '../../func/formatSize';

const VolumeTab = () => {
    const { allVolumes, getAllVolumes } = useDocker();
    
    useEffect(() => {
        getAllVolumes();
    }, [getAllVolumes]);

    return (
        <div className="dockerItems">
            {
                allVolumes &&
                allVolumes.length > 0 &&
                allVolumes.map((vData) => {
                    return (
                        <div key={vData?.Name} className="dockerItem withShadow flexCol gapMD roundSM">
                            <p className="dockerLine">
                                <span>Volume Name: </span>
                                <span>{vData?.Name}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Scope: </span>
                                <span>{vData?.Scope}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Created At: </span>
                                <span>{vData?.CreatedAt}</span>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VolumeTab