import React from 'react'
import FileIcon from './FileIcon'

const FileBox = ({ fileData }) => {

    return (
        <div className='fileBox withPointer roundSM withShadow gapSM'>
            <div className='fileIconCol roundSM'>
                {
                    fileData.type === "file" ? (
                        <FileIcon filename={fileData?.fileName || ""} />
                    ) : (
                        <FileIcon filename={fileData?.folderName || ""} />
                    )
                }
            </div>
            <div className='fileDataCol'>
                {
                    fileData.type === "file" ? (
                        <p className='name'>{fileData?.fileName}</p>
                    ) : (
                        <p className='name'>{fileData?.folderName}</p>
                    )
                }
                <p className='size'>10 MB</p>
            </div>
        </div>
    )
}

export default FileBox