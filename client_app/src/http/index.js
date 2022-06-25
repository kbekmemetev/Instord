import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'


const $host = axios.create({
    baseURL: 'http://192.168.0.101:8000/'
})


const $authHost = axios.create({
    baseURL: 'http://192.168.0.101:8000/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${AsyncStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost 
}