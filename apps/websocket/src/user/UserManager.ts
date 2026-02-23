import { User } from "./User";

export class UserManager{
    private _users: Map<string, User>;
    private static _instance: UserManager;
    private constructor(){
        this._users = new Map<string, User>();
    }
    public static getInstance(){
        if(!this._instance){
            this._instance = new UserManager();
        }
        return this._instance;
    }

    public removeUser(userId: string){
        this._users.delete(userId);
    }

    public getUser(userId: string): User | undefined{
        return this._users.get(userId);
    }

    public upsertUser(userId: string, socketId: string){
        const user = this._users.get(userId);
        if(user){
            user.socketId = socketId;
        }
        else{
            const newUser = new User(userId, socketId);
            this._users.set(userId, newUser);
        }
    }

    public get users(): User[]{
        return Array.from(this._users.values());
    }
}

export const userManager = UserManager.getInstance();