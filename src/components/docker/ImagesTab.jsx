import React, { useEffect } from 'react'
import { useDocker } from '../../context/DockerContext'
import { formatSizeUnits } from '../../func/formatSize';

const ImagesTab = () => {
    const { allImages, getAllImages } = useDocker();
    useEffect(() => {
        getAllImages()
    }, [getAllImages])
    return (
        <div className="dockerItems">
            {
                allImages &&
                allImages.length > 0 &&
                allImages.map((idata) => {
                    return (
                        <div key={idata?.Id} className="dockerItem withShadow flexCol gapMD roundSM">
                            <h3 className='primaryText'>{idata.RepoTags[0] || "N/A"}</h3>
                            <p className="dockerLine">
                                <span>Image Id: </span>
                                <span>{idata?.Id}</span>
                            </p>
                            <p className="dockerLine">
                                <span>Size: </span>
                                <span>{formatSizeUnits(idata?.VirtualSize)}</span>
                            </p>
                        </div>
                    )
                })
            }
            {/* <p style={{ whiteSpace: "pre" }}>{JSON.stringify(allImages, null, 5)}</p> */}
        </div>
    )
}

export default ImagesTab