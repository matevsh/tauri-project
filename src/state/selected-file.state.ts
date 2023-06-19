import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/tauri'

interface SelectedFileState {
    selected: {
        name: string
        path: string
        value: string
    } | null
    setSelected: (name: string, path: string) => void
    clear: () => void
}

function readFile(path: string): Promise<string> {
    return invoke('read_file', { path })
}

export const useSelectedFile = create<SelectedFileState>((set) => ({
    selected: null,
    clear: () => set(() => ({ selected: null })),
    setSelected: (name, path) => {
        readFile(path).then((fileData) => {
            set(() => ({
                selected: { name, path, value: fileData },
            }))
        })
    },
}))
