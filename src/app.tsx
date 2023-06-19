import React from 'react'
import { FileSystem } from './panel/components/file-system/file-system'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { SideBar } from './panel/components/side-bar/side-bar'
import { Calculator } from './calculator/calculator'
import { useSelectedFile } from './state/selected-file.state'
import { OpenFilesBar } from './panel/components/open-files-bar/open-files-bar'

export function App() {
    const selectedFile = useSelectedFile((state) => state.selected)

    return (
        <div className="flex h-screen bg-[#161b22] overflow-hidden">
            <Calculator />
            <SideBar />
            <FileSystem />
            <div className="basis-3/4 w-[75%] flex flex-col">
                <OpenFilesBar />
                <MarkdownEditor
                    value={selectedFile?.value}
                    className="max-h-screen grow"
                />
            </div>
        </div>
    )
}
