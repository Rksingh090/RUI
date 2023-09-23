import React from 'react'
import { useFile } from '../../context/FileContext';
import { useTheme } from '../../context/ThemeContext';

import { Editor } from '@monaco-editor/react'
import { ValidThemes } from '../../config/themes';
import IconButton from '../common/IconButton';

import lightTheme from './lighttheme.json'
import draculaTheme from './draculatheme.json'
import darkTheme from './darktheme.json'

const EditorBox = () => {

    const { editorLanguageModel, handleFileSave, setCodeEditorOpened, codeEditorData, setCodeEditorData } = useFile()
    const { theme } = useTheme()

    const options = {
        minimap: { enabled: false },
        insertSpaces: true,
        tabSize: 4,
    };

    const handleThemeChange = (editor, monaco) => {
        // get current active theme 
        // based on current theme change editor theme 
        const themeType = ValidThemes.filter((item) => item.title === theme);

        // set dark default theme 
        let toSetTheme = darkTheme

        if (themeType.length > 0) {
            const theme = themeType[0];
            if (theme.title === "dracula") {
                toSetTheme = draculaTheme
            } else if (theme.type === "light") {
                toSetTheme = lightTheme
            }
        }

        if (monaco?.editor) {
            // monaco.editor?.setModelLanguage(editor?.getModel(), editorLanguageModel)
            monaco.editor?.setModelLanguage(editor?.getModel(), editorLanguageModel)

            editor.getModel().updateOptions({ tabSize: 6, insertSpaces: true });
            // create theme 
            monaco.editor.defineTheme("rTheme", toSetTheme)
            monaco.editor.setTheme("rTheme")
        }
    };

    return (
        <div className='RCodeEditorWrapper'>
            <div className="CodeEditorHeader">
                <div className='start'>
                    <IconButton
                        text={"Save"}
                        classList={"secondaryBg roundSM fontSM hoverSuccess"}
                        onClick={handleFileSave}
                    />
                    <IconButton
                        text={"Cancle"}
                        classList={"error roundSM fontSM"}
                        onClick={() => setCodeEditorOpened(false)}
                    />
                </div>
                <div className="end">
                    <p className='success'>
                        Language Detected: {String(editorLanguageModel).toUpperCase()}
                    </p>
                </div>
            </div>
            <Editor
                className='RCodeEditor'
                value={codeEditorData}
                language={"javascript"}
                onChange={(value) => setCodeEditorData(value)}
                onMount={handleThemeChange}
                options={options}
            />
        </div>
    );
}

export default EditorBox
{/* 
old code 
<div className='monacoEditorParent'>
<textarea className="codeEditor" value={codeEditorData} onChange={(e) => setCodeEditorData(e.target.value)}>
</textarea> 
</div>
*/}