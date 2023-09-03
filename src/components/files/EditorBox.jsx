import React from 'react'
import { useFile } from '../../context/FileContext';


const EditorBox = () => {

    const { codeEditorData, setCodeEditorData } = useFile()

    return (
        <div className='monacoEditorParent'>

            {highlightedCode}
            {/* <textarea className="codeEditor" value={codeEditorData} onChange={(e) => setCodeEditorData(e.target.value)}>
            </textarea> */}
        </div>
    );
}

export default EditorBox