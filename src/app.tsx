import React, { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { FileSystem } from './panel/components/file-system/file-system'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { SideBar } from './panel/components/side-bar/side-bar'
import { Calculator } from './calculator/calculator'
import { useSelectedFile } from './state/selected-file.state'
import { OpenFilesBar } from './panel/components/open-files-bar/open-files-bar'

interface Todo {
    id: number
    name: string
    completed: boolean
}

async function getTodos(): Promise<Array<Todo>> {
    const data = (await invoke('get_todos')) as string
    return JSON.parse(data)
}

function addTodo(name: string) {
    return invoke('add_todo', { name })
}

function editTodo(id: number, name: string): Promise<string> {
    return invoke('edit_todo', { id: id, newName: name })
}

function toggleTask(id: number) {
    return invoke('toggle_task', { id })
}

export function App() {
    const [todos, setTodos] = useState<Array<Todo>>([])
    const [input, setInput] = useState<string>('')

    const [mdState, setMdState] = useState('')

    function use<T>(fn: () => Promise<T>) {
        fn().then(getTodos).then(setTodos)
    }

    const mdStatex = useSelectedFile((state) => state.selected)

    useEffect(() => {
        getTodos().then(setTodos)
    }, [])

    function addTodoHandler() {
        use(() => addTodo(input))
    }

    function edit(id: number, name: string) {
        use(() => editTodo(id, name))
    }

    function toggleCompleted(id: number) {
        use(() => toggleTask(id))
    }

    return (
        <div className="flex h-screen bg-[#161b22] overflow-hidden">
            <Calculator />
            <SideBar />
            <FileSystem />
            <div className="basis-3/4 w-[75%] flex flex-col">
                <OpenFilesBar />
                <MarkdownEditor
                    value={mdStatex?.value}
                    onChange={setMdState}
                    className="max-h-screen"
                />
            </div>
        </div>
    )
}
