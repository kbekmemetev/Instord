import { $host } from "./index";

export const getDishes = async (category_id) => {
    const {data} = await $host.get('api/item/getall/' + category_id)
    return data
}

export const getDishesUnder = async (category_id) => {
    const {data} = await $host.get('api/item/getallUnder/' + category_id)
    return data
}

export const getDish = async (item_id) => {
    const {data} = await $host.get('api/item/' + item_id)
    return data
}