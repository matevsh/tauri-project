import { IconCalculator, IconSettings } from '@tabler/icons-react'

import { useCalc } from '../../../state/calc.state'

export function SideBar() {
    const toggleCalc = useCalc((state) => state.toggle)

    return (
        <div className="flex flex-col bg-[#161b22] justify-between border-r-2 border-gray-700">
            <div className="p-2 cursor-pointer">
                <IconCalculator color="white" onClick={toggleCalc} />
            </div>
            <div className="p-2 cursor-pointer">
                <IconSettings color="white" />
            </div>
        </div>
    )
}
