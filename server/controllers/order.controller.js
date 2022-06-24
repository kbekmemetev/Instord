const db = require(`../db`)

class OrderController{

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

    async getServedOrderItemsByClientID(req, res){
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
        const client_id = req.params.client_id

        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [client_id, 'CURRENT'])).rows
        const get_items = (await db.query ('SELECT * FROM order_item WHERE order_id = $1', [get_order[0].order_id])).rows
        const set_user_status = await db.query ('UPDATE person SET status = $1 WHERE person_id = $2', [null, client_id])
        
        const get_basket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [client_id])).rows[0]
        const delete_basket = await db.query ('DELETE FROM basket_item WHERE basket_id = $1', [get_basket.basket_id])

        let total = 0
        for (let i = 0; i < get_items.length; i++) {
            const item = (await db.query ('SELECT * FROM item WHERE item_id = $1', [get_items[i].item_id])).rows
            total += item[0].price
        }

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
        return res.json(get_oi.rows)
    }

    async getOrderByID(req, res){
        const id = req.params.id
        const order = (await db.query ('SELECT * FROM orders WHERE order_id = $1', [id])).rows
        return res.json(order[0])
    }

    async getAllOrderItemsByClientID(req, res){
        const id = req.params.id
        const get_order = (await db.query ('SELECT * FROM orders WHERE person_id = $1 and status = $2 ', [id, 'CURRENT'])).rows
        const get_order_items = await db.query ('SELECT * FROM order_item WHERE order_id = $1', [get_order[0].order_id])
        return res.json(get_order_items.rows)
    }

}

module.exports = new OrderController()