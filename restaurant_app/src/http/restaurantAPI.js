import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const createRestaurant = async (id, name, coordinates, address, hours) => {
    const {data} = await $host.post('api/restaurant/', {id, name, coordinates, address, hours})
    return data
}

export const getRestaurantData = async (restauranr_id) => {
    const {data} = await $host.get('api/restaurant/' + restauranr_id)
    return data
}

export const updateRestaurantData = async (restaurant_id, name, hours) => {
    const {data} = await $host.put('api/restaurant/', {restaurant_id, name, hours})
    return data
}



