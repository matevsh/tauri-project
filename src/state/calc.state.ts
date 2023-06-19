import { create } from 'zustand'

interface CalcState {
    shown: boolean
    toggle: () => void
}

export const useCalc = create<CalcState>((set) => ({
    shown: false,
    toggle: () => set((state) => ({ shown: !state.shown })),
}))
