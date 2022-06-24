import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    AsyncStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    AsyncStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    AsyncStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUserData = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    return data
}

export const updateUserData = async (id, email) => {
    const {data} = await $host.put('api/user/', {id, email})
    return data
}

export const checkClientIn = async (restaurant_id, client_id, table, reachedMajorityAge) => {
    const {data} = await $host.post('api/user/checkClientIn/', {restaurant_id, client_id, table, reachedMajorityAge, status: "CURRENT"})
    return data
}