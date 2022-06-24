import { $host } from "./index";

export const getRootCategories = async (restaurant_id) => {
    const {data} = await $host.get('api/category/getRootCategories/' + restaurant_id)
    return data
}

export const getCategoriesByParent = async (parent_id) => {
    const {data} = await $host.get('api/category/getbyparent/' + parent_id)
    return data
}