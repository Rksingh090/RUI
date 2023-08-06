import React from 'react'
import IconButton from '../common/IconButton';

import { BsFolder2 } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { FiFile } from 'react-icons/fi'
import { useFile } from '../../context/FileContext';

const FileHeader = () => {

    const { goBack, currentPath, setRenderState } = useFile();

    return (
        <div className='fileHeader round withShadow'>
            <div className="start">
                <IconButton onClick={goBack} Icon={<BiArrowBack size={15} />} text={"Back"} classList={"gapSM"} />
                <div className='filePath'>
                    <input placeholder={"/"} readOnly value={currentPath} className='noStyle fsm' />
                </div>
            </div>
            <div className="end">
                <IconButton onClick={() => setRenderState("fileCreate")} Icon={<FiFile size={15} />} text={"New File"} classList={"gapSM"} />
                <IconButton onClick={() => setRenderState("folderCreate")} Icon={<BsFolder2 size={14} />} text={"New Dir"} classList={"gapSM"} />
            </div>
        </div>
    )
}

export default FileHeader