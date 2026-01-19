import { create } from "zustand";

interface ISessionState{
    session: string | null
}

export const useSessionState = create<ISessionState & { setState: (newState: Partial<ISessionState>) => void }>((set) => ({
    session: localStorage.getItem("session"),
    setState: (newState) => set((state) => ({ ...state, ...newState }))
}));