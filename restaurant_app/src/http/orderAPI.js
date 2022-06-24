import {$host} from "./index";

export const getCurrentOrders = async (restaurant_id) => {
    const {data} = await $host.get('api/order/getCurrentOrders/' + restaurant_id)
    return data
}

export const getOrderItemsByClientID = async (id) => {
    const {data} = await $host.get('api/order/getOrderItemsByClientID/' + id)
    return data
}

export const getServedOrderItemsByClientID = async (id) => {
    const {data} = await $host.get('api/order/getServedOrderItemsByClientID/' + id)
    return data
}

export const getOrderItem = async (id) => {
    const {data} = await $host.get('api/order/getOrderItem/' + id)
    return data
}

export const dishServed = async (id) => {
    const {data} = await $host.put('api/order/dishServed/' + id)
    return data
}

export const deleteFromOrder = async (id) => {
    const {data} = await $host.delete('api/order/deleteFromOrder/' + id)
    return data
}

export const waiterArrived = async (id) => {
    const {data} = await $host.put('api/order/waiterArrived/' + id)
    return data
}

export const finishOrder = async (client_id) => {
    const {data} = await $host.put('api/order/finishOrder/' + client_id)
    return data
}

export const getOrderHistoryRestaurant = async (id) => {
    const {data} = await $host.get('api/order/getOrderHistoryRestaurant/' + id)
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