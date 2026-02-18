import { Role } from "@repo/db/types";

export interface IUserState {
  username: string;
  email: string;
  password: string;
}

export type SetStateType =
  | Partial<IUserState>
  | ((state: IUserState) => Partial<IUserState>);

export interface IPasswordState {
  showPassword: boolean;
}

export interface IAuthLoadingState {
    loading: boolean;
}


export interface SessionUser{
    name: string;
    email: string;
    role: Role
}