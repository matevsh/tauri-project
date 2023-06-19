import { IconInputSearch, IconSearch, IconX } from '@tabler/icons-react'
import { useState } from 'react'

export function SearchBar() {
    const [input, setInput] = useState('')

    return (
        <div className="flex gap-2 border-b-2 border-gray-700 text-white p-4">
            <IconSearch className="absoulte top-0" />
            <input
                type="text"
                className="w-full bg-[#2a2f37]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></input>
            <IconX onClick={() => setInput('')} className="cursor-pointer" />
        </div>
    )
}
