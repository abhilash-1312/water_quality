import { create } from "zustand";
import {IAuthLoadingState} from '@/types/auth'


export const useAuthLoadingState = create<
  IAuthLoadingState & {
    setLoading: (value: boolean) => void;
  }
>((set) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
}))