import React, { useMemo } from 'react'
import { BiLogoCss3, BiLogoGoLang } from 'react-icons/bi';
import {
    BsFiletypeCsv, BsFiletypeDocx,
    BsFiletypeExe, BsFiletypeGif, BsFiletypeHeic,
    BsFiletypeJsx, BsFiletypeMd, BsFiletypeMp3,
    BsFiletypePdf, BsFiletypePhp, BsFiletypeSh, BsFiletypeTxt, BsGit
} from 'react-icons/bs';

import { VscJson, VscFile } from 'react-icons/vsc';
import { LiaDocker } from 'react-icons/lia';
import { DiJavascript1, DiSass } from 'react-icons/di';
import { SiPython } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { GoFileZip } from 'react-icons/go';
import { PiFilePngLight, PiFileJpgLight } from 'react-icons/pi';
import { LuSettings } from 'react-icons/lu';
import { CiLock } from 'react-icons/ci';

const FileIcon = ({ filename }) => {

    const fileTypes = useMemo(() => [
        {
            type: ["txt"],
            icon: <BsFiletypeTxt size={23} />
        },
        {
            type: ["pdf"],
            icon: <BsFiletypePdf size={23} />
        },
        {
            type: ["mp3"],
            icon: <BsFiletypeMp3 size={23} />
        },
        {
            type: ["png"],
            icon: <PiFilePngLight size={23} />
        },
        {
            type: ["jpg"],
            icon: <PiFileJpgLight size={23} />
        },
        {
            type: ["js"],
            icon: <DiJavascript1 size={23} />
        },
        {
            type: ["jsx"],
            icon: <BsFiletypeJsx size={23} />
        },
        {
            type: ["heic"],
            icon: <BsFiletypeHeic size={23} />
        },
        {
            type: ["docx"],
            icon: <BsFiletypeDocx size={23} />
        },
        {
            type: ["exe"],
            icon: <BsFiletypeExe size={23} />
        },
        {
            type: ["sh"],
            icon: <BsFiletypeSh size={23} />
        },
        {
            type: ["html", "htm"],
            icon: <AiFillHtml5 size={23} />
        },
        {
            type: ["css"],
            icon: <BiLogoCss3 size={23} />
        },
        {
            type: ["sass"],
            icon: <DiSass size={23} />
        },
        {
            type: ["gif"],
            icon: <BsFiletypeGif size={23} />
        },
        {
            type: ["json"],
            icon: <VscJson size={23} />
        },
        {
            type: ["csv"],
            icon: <BsFiletypeCsv size={23} />
        },
        {
            type: ["go", "sum", "mod"],
            icon: <BiLogoGoLang size={25} />
        },
        {
            type: ["php"],
            icon: <BsFiletypePhp size={25} />
        },
        {
            type: ["md"],
            icon: <BsFiletypeMd size={23} />
        },
        {
            type: ["py"],
            icon: <SiPython size={23} />
        },
        {
            type: ["Dockerfile"],
            icon: <LiaDocker size={23} />
        },
        {
            type: ["gitignore"],
            icon: <BsGit size={23} />
        },
        {
            type: ["zip", "rar", "gz"],
            icon: <GoFileZip size={23} />
        },
        {
            type: ["conf", "config"],
            icon: <LuSettings size={23} />
        },
        {
            type: ["lock"],
            icon: <CiLock size={23} />
        },
    ], [])

    const getFileType = () => {
        let fileExt = filename;
        const splitFileName = filename.split(".");
        if (splitFileName.length === 2) {
            fileExt = splitFileName[1];
        } else if (splitFileName.length > 2) {
            fileExt = splitFileName[splitFileName.length - 1];
        }
        const fileIndex = fileTypes.findIndex((item) => item.type.includes(fileExt));
        if (fileIndex !== -1) {
            return fileTypes[fileIndex].icon;
        }
        return <VscFile size={23} />
    }

    return (
        <>
            {getFileType()}
        </>
    )
}

export default FileIcon