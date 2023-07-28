import React from 'react'
import IconButton from '../common/IconButton';

import { BsFolder2 } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { FiFile } from 'react-icons/fi'

const FileHeader = () => {
    return (
        <div className='fileHeader round withShadow'>
            <div className="start">
                <IconButton Icon={<BiArrowBack size={15} />} text={"Back"} classList={"gapSM"} />
                <div className='filePath'>
                    <input placeholder={"/"} className='noStyle' />
                </div>
            </div>
            <div className="end">
                <IconButton Icon={<FiFile size={15} />}  text={"New File"} classList={"gapSM"} />
                <IconButton Icon={<BsFolder2 size={14} />}  text={"New Dir"} classList={"gapSM"} />
            </div>
        </div>
    )
}

export default FileHeader