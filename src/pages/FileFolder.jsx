import React from 'react'
import "../styles/files.css";
import FileHeader from '../components/files/FileHeader';
import FileBox from '../components/files/FileBox';


const FileFolder = () => {
  return (
    <div className='fullXY withPadding'>
      <FileHeader />
      <div className="fileBoxes">
        <FileBox fileData={{ fileName: "hello.txt"}} />
        <FileBox fileData={{ fileName: "app.js"}} />
        <FileBox fileData={{ fileName: "imp.docx"}} />
        <FileBox fileData={{ fileName: "somefile.pdf"}} />
        <FileBox fileData={{ fileName: "bash.sh"}} />
        <FileBox fileData={{ fileName: "bash.docx"}} />
        <FileBox fileData={{ fileName: "bash.docx"}} />
        <FileBox fileData={{ fileName: "music.mp3"}} />
        <FileBox fileData={{ fileName: "img.jpg"}} />
        <FileBox fileData={{ fileName: "tansimg.png"}} />
        <FileBox fileData={{ fileName: "index.html"}} />
      </div>
    </div>
  )
}

export default FileFolder