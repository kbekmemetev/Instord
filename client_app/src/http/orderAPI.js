import { $host } from "./index";

export const getOrderItemsByClientID = async (id) => {
    const {data} = await $host.get('api/order/getOrderItemsByClientID/' + id)
    return data
}

export const getServedOrderItemsByClientID = async (user_id) => {
    const {data} = await $host.get('api/order/getServedOrderItemsByClientID/' + user_id)
    return data
}

export const getOrderItem = async (oi_id) => {
    const {data} = await $host.get('api/order/getOrderItem/' + oi_id)
    return data
}

export const callWaiter = async (user_id) => {
    const {data} = await $host.put('api/order/callWaiter/' + user_id)
    return data
}

export const getOrderHistoryClient = async (user_id) => {
    const {data} = await $host.get('api/order/getOrderHistoryClient/' + user_id)
    return data
}

export const getOrderItemsByOrderID = async (id) => {
    const {data} = await $host.get('api/order/getOrderItemsByOrderID/' + id)
    return data
}

export const getOrderByID = async (id) => {
    const {data} = await $host.get('api/order/getOrderByID/' + id)
    return data
}