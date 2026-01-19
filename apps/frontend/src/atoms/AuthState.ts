import { create } from "zustand";

interface IAuthState{
    username: string,
    email: string, 
    password: string,
}

export const useAuthState = create<IAuthState & { setState: (newState: Partial<IAuthState>) => void }>((set) => ({
    username: "",
    email: "",
    password: "",
    setState: (newState) => set((state) => ({ ...state, ...newState }))
}));