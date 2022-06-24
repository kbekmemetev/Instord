const db = require(`../db`)

class ClientController{

// MOVED TO USER
    async checkClientIn(req, res){
        const {user_id, client_id, table, reached_majority_age} = req.body
        const user_upd = await db.query ('UPDATE person SET status = $1, reached_majority_age = $2 WHERE person_id = $3 RETURNING *', [user_id, reached_majority_age, client_id])
        const order = await db.query ('INSERT INTO orders (person_id, restaurant_id, table_number, status) values ($1, $2, $3, $4) RETURNING *', [client_id, user_id, table, 'CURRENT'])
        return res.json(order.rows[0])
    }

    // async checkIfUnderaged(req, res){
    //     const user_id = req.params.id
    //     const check = (await db.query ('SELECT * FROM person WHERE person_id = $1', [user_id])).rows
    //     return res.json(check[0].reached_majority_age)
    // }


    // async checkIfRegistred(req, res){
    //     const user_id = req.params.id
    //     const check = (await db.query ('SELECT * FROM person WHERE person_id = $1', [user_id])).rows
    //     return res.json(check)
    // }


// MOVED TO BASKET

    async addToBasket(req, res){
        const {user_id, item_id} = req.body
        const getBasket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [user_id])).rows
        const addToBasket = await db.query ('INSERT INTO basket_item (basket_id, item_id) values ($1, $2, $3) RETURNING *', [getBasket[0].basket_id, item_id])
        return res.json(addToBasket)
    }

    async getBasketItems(req, res){
        const user_id = req.params.id
        const getBasket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [user_id])).rows
        const basket_items = await db.query ('SELECT * FROM basket_item WHERE basket_id = $1', [getBasket[0].basket_id])
        return res.json(basket_items.rows)
    }

    // async getBasketInfo(req, res){
    //     const item_id = req.params.id
    //     const getItem = (await db.query ('SELECT * FROM item WHERE item_id = $1', [item_id])).rows
    //     return res.json(getItem[0])
    // }


    async deleteFromBasket (req, res){
        const id = req.params.id
        const deleteFromBasket = await db.query ('DELETE FROM basket_item WHERE bi_id = $1', [id])

        return res.json(deleteFromBasket)
    }

    async CarttoOrder (req, res){

        let time_in_ms = new Date()
        time_in_ms = time_in_ms.getTime()
        
        const id = req.params.id
        const getBasket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [id])).rows
        const basket_items = (await db.query ('SELECT * FROM basket_item WHERE basket_id = $1', [getBasket[0].basket_id])).rows
        const get_order = (await db.query(`SELECT * FROM orders WHERE person_id = $1 and status = $2`, [id, 'CURRENT'])).rows

        for(let i = 0; i < basket_items.length; i++) {
            const move = await db.query ('INSERT INTO order_item (order_id, time_ms, item_id) values ($1, $2, $3)', [get_order[0].order_id, time_in_ms, basket_items[i].item_id])
        }

        const remove = await db.query ('DELETE FROM basket_item WHERE basket_id = $1', [getBasket[0].basket_id])
        
        return res.json(remove)
        
    }

// MOVED TO ORDER

    async getCurrentOrders(req, res){
        const restaurant_id = req.params.id
        const get_orders = await db.query ('SELECT * FROM orders WHERE restaurant_id = $1 and status = $2 ', [restaurant_id, 'CURRENT'])
        return res.json(get_orders.rows)
    }

    async getOrderItemsByClientID(req, res){
        const id = req.params.id
        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const get_order_items = await db.query ('SELECT * FROM order_item WHERE order_id = $1 and is_served = $2 ', [get_order[0].order_id, false])
        return res.json(get_order_items.rows)
    }

    async getServedOrderItems(req, res){
        const id = req.params.id
        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const get_order_items = await db.query ('SELECT * FROM order_item WHERE order_id = $1 and is_served = $2 ', [get_order[0].order_id, true])
        return res.json(get_order_items.rows)
        
    }

    async getOrderItem(req, res){
        const id = req.params.id
        const get_order_items = await db.query ('SELECT * FROM order_item WHERE oi_id = $1', [id])
        return res.json(get_order_items.rows[0])
    }
    
    // async getDishItemDetails(req, res){
    //     const id = req.params.id
    //     const item = await db.query(`SELECT * FROM item WHERE item_id = $1`, [id])
    //     return res.json(item.rows[0])
    // }

    async dishServed(req, res){
        const id = req.params.id
        const set_served = await db.query ('UPDATE order_item SET is_served = $1 WHERE oi_id = $2', [true, id]) 
    }

    async deleteFromOrder(req, res){
        const id = req.params.id
        const delete_item = await db.query ('DELETE FROM order_item WHERE oi_id = $1', [id])
    }

    async callWaiter(req, res){
        const id = req.params.id
        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const call_waiter = await db.query ('UPDATE orders SET needs_waiter = $1 WHERE order_id = $2', [true, get_order[0].order_id])
    }

    async waiterArrived(req, res){
        const id = req.params.id
        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const call_waiter = await db.query ('UPDATE orders SET needs_waiter = $1 WHERE order_id = $2', [false, get_order[0].order_id])
    }

    async finishOrder(req, res){
        const id = req.params.id

        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const get_items = (await db.query ('SELECT * FROM order_item WHERE order_id = $1', [get_order[0].order_id])).rows
        const set_user_status = await db.query ('UPDATE person SET status = $1 WHERE person_id = $2', [null, id])
        
        const get_basket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [id])).rows[0]
        const delete_basket = await db.query ('DELETE FROM basket_item WHERE basket_id = $1', [get_basket.basket_id])

        const complete_order = await db.query ('UPDATE orders SET status = $1, total_price = $2 WHERE order_id = $3', ['FINISHED', total, get_order[0].order_id])
    }

    async getOrderHistoryClient(req, res){
        const id = req.params.id
        const get_orders = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'FINISHED'])).rows

        return res.json(get_orders)
    }

    async getOrderHistoryRestaurant(req, res){
        const id = req.params.id
        const get_restaurant_orders = (await db.query ('SELECT * FROM orders WHERE restaurant_id = $1 and status = $2 ', [id, 'FINISHED'])).rows
        return res.json(get_restaurant_orders)
    }

    async getOrderItemsByOrderID(req, res){
        const id = req.params.id
        const get_oi = await db.query ('SELECT * FROM order_item WHERE order_id = $1', [id])
        return res.json(get_order_items.rows)
    }

    // async getRestaurantName(req, res){
    //     const id = req.params.id
    //     const restaurant_name = (await db.query ('SELECT * FROM restaurant WHERE restaurant_id = $1', [id])).rows
    //     return res.json(restaurant_name[0].name)
    // }

    // async getClientEmail(req, res){
    //     const id = req.params.id
    //     const person_email = (await db.query ('SELECT * FROM person WHERE person_id = $1', [id])).rows
    //     return res.json(person_email[0].email)
    // }

    async getOrderByID(req, res){
        const id = req.params.id
        const order = (await db.query ('SELECT * FROM orders WHERE order_id = $1', [id])).rows
        return res.json(order[0])
    }


    
}

module.exports = new ClientController()