export class User{
    private _userId: string
    private _socketId: string
    constructor(_userId: string, _socketId: string){
        this._userId = _userId
        this._socketId = _socketId
    }
    public get userId(){
        return this._userId
    }
    public get socketId(){
        return this._socketId
    }

    public set socketId(socketId: string){
        this._socketId = socketId
    }
}