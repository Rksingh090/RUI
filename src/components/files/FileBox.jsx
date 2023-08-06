import React from 'react'
import FileIcon from './FileIcon'
import { BsFolder } from 'react-icons/bs'
import { formatSizeUnits } from '../../func/formatSize'
import { useFile } from '../../context/FileContext'

const FileBox = ({ fileData }) => {

    const { goNextDir } = useFile()
    return (
        <div className='fileBox withPointer roundSM withShadow gapSM'
                onDoubleClick={() => goNextDir(fileData)}
                // onContextMenu={(e) => set}
        >
            <div className='fileIconCol roundSM'>
                {
                    !fileData?.isDir ? (
                        <FileIcon filename={fileData?.name || ""} />
                    ) : (
                        <BsFolder size={18} />
                    )
                }
            </div>
            <div className='fileDataCol'>
                <p className='name'>{fileData?.name}</p>
                {
                    !fileData.isDir && (
                        <p className='size'>{formatSizeUnits(fileData?.size)}</p>
                    )
                }
            </div>
        </div>
    )
}

export default FileBox