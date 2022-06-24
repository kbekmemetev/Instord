import { $host } from "./index";

export const addToBasket = async (user_id, item_id) => {
    const {data} = await $host.post('api/basket/addToBasket/', {user_id, item_id})
    return data
}

export const getBasketItems = async (user_id) => {
    const {data} = await $host.get('api/basket/getBasketItems/' + user_id)
    return data
}

export const getBasketItem = async (bi_id) => {
    const {data} = await $host.get('api/basket/getBasketItems/' + bi_id)
    return data
}

export const CarttoOrder = async (user_id) => {
    const {data} = await $host.get('api/basket/CarttoOrder/' + user_id)
    return data
}

export const deleteFromBasket = async (bi_id) => {
    const {data} = await $host.delete('api/basket/deleteFromBasket/' + bi_id)
    return data
}