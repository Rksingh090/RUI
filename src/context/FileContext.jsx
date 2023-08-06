import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react'
import { API } from '../constants';
import RModal from '../components/common/RModal';
import RInput from '../components/common/RInput';
import IconButton from '../components/common/IconButton';
import { AiOutlinePlus } from 'react-icons/ai';

const fileCtx = createContext({});
export const useFile = () => useContext(fileCtx)

const FileContext = ({ children }) => {

    // current wordking dir path 
    const [currentPath, setCurrentPath] = useState("/");

    const [renderState, setRenderState] = useState("");

    // file and folder input for create api
    const [createFileName, setCreateFileName] = useState("");
    const [createFolderName, setCreateFolderName] = useState("");

    // all files list of current path 
    const [allFiles, setAllFiles] = useState([]);


    const getAllFiles = useCallback(() => {
        axios.post(`${API}/v1/files/read-dir`, { path: currentPath })
            .then((res) => {
                const { status, files } = res.data;
                if (status === "success") {
                    setAllFiles(files);
                }
            }).catch((err) => {
                console.warn(err);
            })
    }, [currentPath]);

    // go back path 
    const goBack = () => {
        if (currentPath === "/") return;
        let splitPath = currentPath.split("/");
        let filterPath = splitPath.filter((item) => String(item).trim() !== "");
        if (filterPath.length <= 1) {
            setCurrentPath("/");
            return;
        }
        filterPath.pop();
        let newPath = "/";
        newPath += filterPath.join("/");
        setCurrentPath(newPath);
    }

    // go to clicked path if isDir
    const goNextDir = (fileData) => {
        if (!fileData.isDir || fileData.isDir === undefined) return;
        let hasEndSlash = currentPath.charAt(currentPath.length - 1) === "/";
        if (hasEndSlash) {
            setCurrentPath(prev => prev + fileData.name)
        } else {
            setCurrentPath(prev => prev + "/" + fileData.name)
        }
    }

    // create new file 
    const createNewFile = () => {
        axios.post(`${API}/v1/files/create-file`, {
            path: currentPath,
            name: createFileName
        })
            .then((res) => {
                const { status, file } = res.data;
                if (status === "success") {
                    setAllFiles(prev => [...prev, file]);
                }
            }).catch((err) => {
                console.warn(err);
            }).finally(() => {
                setRenderState("")
                setCreateFileName("")
            })
    }

    // create new folder
    const createNewFolder = () => {
        axios.post(`${API}/v1/files/create-folder`, {
            path: currentPath,
            name: createFolderName
        })
            .then((res) => {
                const { status, folder } = res.data;
                if (status === "success") {
                    setAllFiles(prev => [...prev, folder]);
                }
            }).catch((err) => {
                console.warn(err);
            }).finally(() => {
                setRenderState("")
                setCreateFolderName("")
            })
    }

    return (
        <fileCtx.Provider
            value={{
                getAllFiles,
                allFiles,
                currentPath,
                goBack,
                goNextDir,


                createFileName, setCreateFileName,
                createFolderName, setCreateFolderName,
                renderState, setRenderState
            }}
        >

            {/* create file modal  */}
            <RModal show={renderState === "fileCreate"} width={"250px"} formClass={"flexCol"} height={"auto"}>
                <RInput placeholder={"File Name"} value={createFileName} onChange={(e) => setCreateFileName(e.target.value)} RClass={"secondaryBg roundSM"} />
                <div className='flexRow fullX gapMD'>
                    <IconButton onClick={() => setRenderState("")} text={"Cancle"} classList={"secondaryBg roundSM"} />
                    <IconButton onClick={createNewFile} text={"Create"} Icon={<AiOutlinePlus />} classList={"primaryBg gapSM roundSM"} />
                </div>
            </RModal>

            {/* create folder modal  */}
            <RModal show={renderState === "folderCreate"} width={"250px"} formClass={"flexCol"} height={"auto"}>
                <RInput placeholder={"Folder Name"} value={createFolderName} onChange={(e) => setCreateFolderName(e.target.value)} RClass={"secondaryBg roundSM"} />
                <div className='flexRow fullX gapMD'>
                    <IconButton onClick={() => setRenderState("")} text={"Cancle"} classList={"secondaryBg roundSM"} />
                    <IconButton onClick={createNewFolder} text={"Create"} Icon={<AiOutlinePlus />} classList={"primaryBg gapSM roundSM"} />
                </div>
            </RModal>


            {children}
        </fileCtx.Provider>
    )
}

export default FileContext