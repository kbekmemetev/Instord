const db = require(`../db`)
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class ItemController{
    async create(req, res, next) {
        console.log(req.body)
        let {name, category, weight, isLiquid, price, allowedUnderaged, description, composition} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpeg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))
        const item = await db.query(`INSERT INTO item (name, category_id, weight, is_liquid, price, is_allowed_underaged, description, composition, image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [name, category, weight, isLiquid, price, allowedUnderaged, description, composition, fileName])
        return res.json(item.rows[0])
     

    }

    async getAll(req, res){
        const category_id = req.params.category_id
        const items = await db.query(`SELECT * FROM item WHERE category_id = $1`, [category_id])
        return res.json(items.rows)
    }

    async getAllForUnderaged(req, res){
        const id = req.params.category_id
        const items = await db.query(`SELECT * FROM item WHERE category_id = $1 and is_allowed_underaged = $2`, [id, true])
        return res.json(items.rows)
    }

    async getOne(req, res){
        const id = req.params.id
        const item = await db.query(`SELECT * FROM item WHERE item_id = $1`, [id])
        return res.json(item.rows[0])
    }

    async update(req, res){
        let {id, name, category, weight, isLiquid, price, allowedUnderaged, description, composition} = req.body
        
        if (req.files) {
            const {image} = req.files
            let fileName = uuid.v4() + ".jpeg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const name_upd = await db.query(`UPDATE item SET name = $1, weight = $2, price = $3, is_allowed_underaged = $4, description = $5, composition = $6, category_id = $7, is_liquid = $8, image = $9 WHERE item_id = $10`, [name, weight, price, allowedUnderaged, description, composition, category, isLiquid, fileName, id])

        } else {
            const name_upd = await db.query(`UPDATE item SET name = $1, weight = $2, price = $3, is_allowed_underaged = $4, description = $5, composition = $6, category_id = $7, is_liquid = $8 WHERE item_id = $9`, [name, weight, price, allowedUnderaged, description, composition, category, isLiquid, id])
        }
        
    }

    async delete(req, res){
        const id = req.params.id
        const item = await db.query(`DELETE FROM item WHERE item_id = $1`, [id])
        return res.json(item.rows[0])
    }
}

module.exports = new ItemController()