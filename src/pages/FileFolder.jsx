import React, { useEffect } from 'react'
import "../styles/files.css";
import FileHeader from '../components/files/FileHeader';
import FileBox from '../components/files/FileBox';
import { useFile } from '../context/FileContext';


const FileFolder = () => {

  const {getAllFiles, allFiles} = useFile();

  useEffect(() => {
    getAllFiles()
  }, [getAllFiles])

  return (
    <div className='fullXY withPadding'>
      <FileHeader />
      <div className="fileBoxes">
        {
          allFiles &&
          allFiles.length > 0 &&
          allFiles.map((fileData, idx) => {
            return (
              <FileBox key={idx} fileData={fileData} />

            )
          })
        }
      </div>
    </div>
  )
}

export default FileFolder