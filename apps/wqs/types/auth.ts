import { Role } from "@repo/db/types";

export interface BaseUser{
  username: string;
  email: string
}

export interface IUserState extends BaseUser{
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

export interface Technician extends BaseUser{
  userId: string,
  createdAt: Date,
  _count: {
    testStories: number
  }
}