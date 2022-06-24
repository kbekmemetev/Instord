import { $host } from "./index";


export const getRestaurants = async () => {
    const {data} = await $host.get('api/restaurant/')
    return data
}

export const getRestaurant = async (restaurant_id) => {
    const {data} = await $host.get('api/restaurant/' + restaurant_id)
    return data
}
