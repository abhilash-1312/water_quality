import type { IUserState, SetStateType } from "@/types/auth";
import { create } from "zustand";



export const useUserState = create<
  IUserState & { setState: (newState: SetStateType) => void }
>((set) => ({
  username: "",
  email: "",
  password: "",

  setState: (newState) =>
    set((state) => ({
      ...state,
      ...(typeof newState === "function"
        ? newState(state)
        : newState),
    })),
}));
