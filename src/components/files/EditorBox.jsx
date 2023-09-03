import React from 'react'
import { useFile } from '../../context/FileContext';

import hljs from 'highlight.js'

const EditorBox = () => {

    const { codeEditorData, setCodeEditorData } = useFile()

    const highlightedCode = hljs.highlightAuto(`let a = document.getElementById("DG")`).value

    return (
        <div className='monacoEditorParent'>

            {highlightedCode}
            {/* <textarea className="codeEditor" value={codeEditorData} onChange={(e) => setCodeEditorData(e.target.value)}>
            </textarea> */}
        </div>
    );
}

export default EditorBox