import { motion, AnimatePresence, Variants } from 'framer-motion'

import img from './background.png'
import { useCalc } from '../state/calc.state'

export function Calculator() {
    const isCalcShown = useCalc((item) => item.shown)

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

    return (
        <AnimatePresence>
            {isCalcShown ? (
                <motion.div
                    className="fixed right-0 bottom-0 bg-gray-500 rounded-tl-2xl overflow-hidden z-10"
                    layout
                    initial={{
                        transform: 'translateX(100%)',
                    }}
                    animate={{
                        transform: 'translateX(0%)',
                    }}
                    exit={{
                        transform: 'translateX(100%)',
                    }}
                    transition={{
                        type: 'spring',
                    }}
                >
                    <img src={img} alt="test" />
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
