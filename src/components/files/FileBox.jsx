import React from 'react'
import FileIcon from './FileIcon'

const FileBox = ({fileData}) => {

    return (
        <div className='fileBox withPointer roundSM withShadow gapSM'>
            <div className='fileIconCol roundSM'>
                <FileIcon filename={fileData?.fileName || ""} />
            </div>
            <div className='fileDataCol'>
                <p>websites</p>
                <p>10 MB</p>
            </div>
        </div>
    )
}

export default FileBox