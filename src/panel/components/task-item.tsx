import { useState } from 'react'

interface Props {
    name: string
    completed: boolean
    id: number
    onEdit: (id: number, name: string) => void
    toggleCompleted: (id: number) => void
}

export function TaskItem({
    id,
    onEdit,
    completed,
    name,
    toggleCompleted,
}: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [input, setInput] = useState<string>(name)

    function startEditing() {
        setIsEditing((prev) => !prev)
    }

    function editHandler() {
        onEdit(id, input)
        setIsEditing(false)
    }

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleCompleted(id)}
                className="bg-gray-500 accent-pink-500"
            />
            {isEditing ? (
                <input
                    type="text"
                    onChange={(ev) => setInput(ev.currentTarget.value)}
                    value={input}
                    className="outline-0 border-0 bg-slate-200 rounded-md"
                />
            ) : (
                <h1 className="font-bold pr-4">{name}</h1>
            )}
            {isEditing ? (
                <button onClick={editHandler}>Zapisz</button>
            ) : (
                <button onClick={startEditing}>Edytuj</button>
            )}
        </div>
    )
}
