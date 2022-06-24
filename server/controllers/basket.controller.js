const db = require(`../db`)

class BasketController{

    async addToBasket(req, res){
        const {user_id, item_id} = req.body
        const getBasket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [user_id])).rows
        const addToBasket = await db.query ('INSERT INTO basket_item (basket_id, item_id) values ($1, $2) RETURNING *', [getBasket[0].basket_id, item_id])
        return res.json(addToBasket)
    }

    async getBasketItems(req, res){
        const user_id = req.params.user_id
        const getBasket = (await db.query ('SELECT * FROM basket WHERE person_id = $1', [user_id])).rows
        const basket_items = await db.query ('SELECT * FROM basket_item WHERE basket_id = $1', [getBasket[0].basket_id])
        return res.json(basket_items.rows)
    }

    async getBasketItem(req, res){
        const bi_id = req.params.id
        const basket_items = await db.query ('SELECT * FROM basket_item WHERE bi_id = $1', [bi_id])
        return res.json(basket_items.rows[0])
    }

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
    
}

module.exports = new BasketController()