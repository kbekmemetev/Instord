import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isIn = false
        this._info = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsIn(bool) {
        this._isIn = bool
    }

    setInfo(info) {
        this._info = info
    }

    get isAuth() {
        return this._isAuth
    }

    get isIn() {
        return this._isIn
    }

    get info() {
        return this._info
    }
}