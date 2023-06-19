import { useSelectedFile } from '../../../state/selected-file.state'
import { IconX } from '@tabler/icons-react'

export function OpenFilesBar() {
    const [selected, clear] = useSelectedFile((state) => [
        state.selected,
        state.clear,
    ])

    return selected ? (
        <div className="h-8 bg-[#20252c] flex items-center py-2">
            <IconX
                color="white"
                size={15}
                className="cursor-pointer mx-2"
                onClick={clear}
            />
            <span className="text-white">{selected?.name}</span>
        </div>
    ) : null
}
