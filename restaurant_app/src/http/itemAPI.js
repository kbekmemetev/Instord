import {$authHost, $host} from "./index";


export const createDish = async (item) => {
    const {data} = await $host.post('api/item/', item, {
        headers: { 'Content-Type': 'multipart/form-data'}})
    return data
}

export const getDishes = async (id) => {
    const {data} = await $host.get('api/item/getall/' + id)
    return data
}

export const getDish = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const updateDish = async (item) => {
    const {data} = await $host.put('api/item/', item)
    return data
}

export const deleteDish = async (id) => {
    const {data} = await $host.delete('api/item/' + id)
    return data
}



