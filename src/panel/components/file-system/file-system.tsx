import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

import { FsNode } from './fs-node'
import { Fs } from '../../type/fs'
import styles from './scroll.module.css'
import { SearchBar } from './search-bar/search-bar'

async function getFs(): Promise<Fs> {
    const data = await invoke<string>('get_fs')
    return JSON.parse(data)
}

export function FileSystem() {
    const [fs, setFs] = useState<Fs | undefined>()
    const [showFs, setShowFs] = useState(true)

    function updateFs<T>(fn: () => Promise<T>) {
        fn().then()
    }

    useEffect(() => {
        getFs().then(setFs)
    }, [])

    return (
        <div
            className={`max-h-screen overflow-y-scroll ${styles.hideScrollBar}`}
        >
            <SearchBar />
            <ol
                className={`bg-[#20252c] grow basis-1/4 select-none text-zinc-400 p-4 font-mono`}
            >
                {fs?.map((item, idx) => (
                    <FsNode fs={item} key={idx} />
                ))}
            </ol>
        </div>
    )
}
