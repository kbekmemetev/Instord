import {$host} from "./index";


export const createCategory = async (name, parent, user_id) => {
    const {data} = await $host.post('api/category/', {name, parent, user_id})
    return data
}

export const getCategories = async (user_id) => {
    const {data} = await $host.get('api/category/getall/' + user_id)
    return data
}

export const getRootCategories = async (restaurant_id) => {
    const {data} = await $host.get('api/category/getRootCategories/' + restaurant_id)
    return data
}

export const getCategoryByParent = async (parent_id) => {
    const {data} = await $host.get('api/category/getCategoryByParent/' + parent_id)
    return data
}

export const updateCategory = async (name, parent, id) => {
    const {data} = await $host.put('api/category/', {name, parent, id})
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $host.delete('api/category/' + id)
    return data
}
