interface DirectoryRoot {
    label: string
}

export interface File extends DirectoryRoot {
    extension: string
}

export interface Directory extends DirectoryRoot {
    children: (Directory | File)[]
}
