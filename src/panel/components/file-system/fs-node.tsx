import { type FsNode } from '../../type/fs'
import { useState } from 'react'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { IconArrowDown, IconChevronDown } from '@tabler/icons-react'
import { useSelectedFile } from '../../../state/selected-file.state'

interface Props {
    fs: FsNode
}

const listVariants: Variants = {
    initial: {
        opacity: 0,
        height: 0,
    },
    animate: {
        opacity: 1,
        height: 'auto',
    },
    exit: {
        opacity: 0,
        height: 0,
    },
}

export function FsNode({ fs }: Props) {
    const [expand, setExpand] = useState(false)

    const setMd = useSelectedFile((state) => state.setSelected)

    if ('File' in fs) {
        return (
            <li
                className="hover:text-white cursor-pointer"
                onClick={() => {
                    setMd(fs.File.name, fs.File.path)
                }}
            >
                {fs.File.name}
            </li>
        )
    } else if ('Dir' in fs) {
        return (
            <motion.li>
                <div
                    className="flex"
                    onClick={() => setExpand((prev) => !prev)}
                >
                    <motion.span
                        initial={{ transform: 'rotate(-90deg)' }}
                        animate={{
                            transform: `rotate(${expand ? '0' : '-90deg'})`,
                        }}
                    >
                        <IconChevronDown />
                    </motion.span>
                    {fs.Dir.name}
                </div>
                <div>
                    <AnimatePresence>
                        {expand ? (
                            <motion.ul
                                className={`pl-4 overflow-hidden`}
                                variants={listVariants}
                                layout
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {fs.Dir.children.map((item) => (
                                    <FsNode fs={item} />
                                ))}
                            </motion.ul>
                        ) : null}
                    </AnimatePresence>
                </div>
            </motion.li>
        )
    }

    return null
}
