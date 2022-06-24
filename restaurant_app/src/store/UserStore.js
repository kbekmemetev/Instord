import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._info = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    
    setInfo(info) {
        this._info = info
    }

    get isAuth() {
        return this._isAuth
    }
    get info() {
        return this._info
    }
}