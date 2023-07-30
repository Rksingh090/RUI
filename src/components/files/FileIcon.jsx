import React, { useMemo } from 'react'
import {
    BsFiletypeCss, BsFiletypeCsv, BsFiletypeDocx,
    BsFiletypeExe, BsFiletypeGif, BsFiletypeHeic, BsFiletypeHtml,
    BsFiletypeJpg, BsFiletypeJs, BsFiletypeJson, BsFiletypeMp3,
    BsFiletypePdf, BsFiletypePng, BsFiletypeSh, BsFiletypeTxt, BsFolder
}
    from 'react-icons/bs'

const FileIcon = ({ filename }) => {

    const fileTypes = useMemo(() => [
        {
            type: ".txt",
            icon: <BsFiletypeTxt size={18} />
        },
        {
            type: ".pdf",
            icon: <BsFiletypePdf size={18} />
        },
        {
            type: ".mp3",
            icon: <BsFiletypeMp3 size={18} />
        },
        {
            type: ".png",
            icon: <BsFiletypePng size={18} />
        },
        {
            type: ".jpg",
            icon: <BsFiletypeJpg size={18} />
        },
        {
            type: ".js",
            icon: <BsFiletypeJs size={18} />
        },
        {
            type: ".heic",
            icon: <BsFiletypeHeic size={18} />
        },
        {
            type: ".docx",
            icon: <BsFiletypeDocx size={18} />
        },
        {
            type: ".exe",
            icon: <BsFiletypeExe size={18} />
        },
        {
            type: ".sh",
            icon: <BsFiletypeSh size={18} />
        },
        {
            type: ".html",
            icon: <BsFiletypeHtml size={18} />
        },
        {
            type: ".css",
            icon: <BsFiletypeCss size={18} />
        },
        {
            type: ".gif",
            icon: <BsFiletypeGif size={18} />
        },
        {
            type: ".json",
            icon: <BsFiletypeJson size={18} />
        },
        {
            type: ".csv",
            icon: <BsFiletypeCsv size={18} />
        },
    ], [])

    const getFileType = () => {
        const fileIndex = fileTypes.findIndex((item) => String(filename).toLowerCase().includes(item.type));
        if (fileIndex !== -1) {
            return fileTypes[fileIndex].icon;
        }
        return <BsFolder size={18} />
    }

    return (
        <>
            {getFileType()}
        </>
    )
}

export default FileIcon