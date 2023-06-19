export interface FsFile {
    File: {
        name: string
        path: string
    }
}

export interface FsDir {
    Dir: {
        name: string
        path: string
        children: Fs
    }
}

export type FsNode = FsFile | FsDir
export type Fs = Array<FsNode>
