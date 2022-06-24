const db = require(`../db`)

class restaurantController{
    async create(req, res){
        const {id, name, coordinates, address, hours} = req.body
        const restaurant = await db.query ('INSERT INTO restaurant (restaurant_id, name, coordinates, address, work_hours) values ($1, $2, $3, $4, $5) RETURNING *', [id, name, coordinates, address, hours])
        const menu = await db.query ('INSERT INTO menu (restaurant_id) values ($1)', [restaurant.rows[0]['restaurant_id']])
        
        
        return res.json(restaurant.rows[0])
    }

    async getAll(req, res){
        const restaurants = await db.query(`SELECT * FROM restaurant`)
        return res.json(restaurants.rows)
    }

    async getOne(req, res){
        const id = req.params.id
        const restaurant = await db.query(`SELECT * FROM restaurant WHERE restaurant_id = $1`, [id])
        return res.json(restaurant.rows[0])
    }

    async update(req, res){
        const {id, name, hours} = req.body
        const restaurant = await db.query(`UPDATE restaurant SET name = $1, work_hours = $2 WHERE restaurant_id = $3`, [name, hours, id])
        return res.json(restaurant.rows[0])
    }
    
    async delete(req, res){
        const id = req.params.id
        const restaurant = await db.query(`DELETE FROM restaurant WHERE restaurant_id = $1`, [id])
        return res.json(restaurant.rows[0])
    }
}

module.exports = new restaurantController()