import React from 'react'
import "../styles/files.css";
import FileHeader from '../components/files/FileHeader';
import FileBox from '../components/files/FileBox';


const FileFolder = () => {
  return (
    <div className='fullXY withPadding'>
      <FileHeader />
      <div className="fileBoxes">
        <FileBox fileData={{ type: "file", fileName: "hello.txt"}} />
        <FileBox fileData={{ type: "file", fileName: "app.js"}} />
        <FileBox fileData={{ type: "file", fileName: "imp.docx"}} />
        <FileBox fileData={{ type: "file", fileName: "somefile.pdf"}} />
        <FileBox fileData={{ type: "file", fileName: "bash.sh"}} />
        <FileBox fileData={{ type: "file", fileName: "bash.docx"}} />
        <FileBox fileData={{ type: "file", fileName: "bash.docx"}} />
        <FileBox fileData={{ type: "folder", folderName: "var"}} />
        <FileBox fileData={{ type: "folder", folderName: "lib"}} />
        <FileBox fileData={{ type: "file", fileName: "music.mp3"}} />
        <FileBox fileData={{ type: "file", fileName: "img.jpg"}} />
        <FileBox fileData={{ type: "file", fileName: "tansimg.png"}} />
        <FileBox fileData={{ type: "file", fileName: "index.html"}} />
      </div>
    </div>
  )
}

export default FileFolder