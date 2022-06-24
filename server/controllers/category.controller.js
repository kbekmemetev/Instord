const db = require(`../db`)

class CategoryController{
    async create(req, res){
        const {name, parent, user_id} = req.body
        let new_parent = parent
        if (new_parent == '' || new_parent === undefined) {
            new_parent = 0
        }
        const get_menu = (await db.query(`SELECT * FROM menu WHERE (restaurant_id) = $1;`, [user_id])).rows
        const category = await db.query ('INSERT INTO category (name, menu_id, parent) values ($1, $2, $3) RETURNING *', [name, get_menu[0]['menu_id'], new_parent])
        return res.json(category.rows[0])
    }

    async getAll(req, res){
        const restaurant_id = req.params.id
        const get_menu = (await db.query(`SELECT * FROM menu WHERE (restaurant_id) = $1;`, [restaurant_id])).rows
        const categories = await db.query(`SELECT * FROM category WHERE menu_id = $1`, [get_menu[0]['menu_id']])
        return res.json(categories.rows)
    }

    async getRootCategories(req, res){
        const restaurant_id = req.params.restaurant_id
        const get_menu = (await db.query(`SELECT * FROM menu WHERE (restaurant_id) = $1;`, [restaurant_id])).rows
        const categories = await db.query(`SELECT * FROM category WHERE menu_id = $1 and parent = $2`, [get_menu[0]['menu_id'], 0])

        return res.json(categories.rows)
    }

    async getCategoryByParent(req, res){
        const parent_id = req.params.parent_id
        const categories = await db.query(`SELECT * FROM category WHERE parent = $1`, [parent_id])
    
        return res.json(categories.rows)
    }


    async update(req, res){
        const {name, parent, id} = req.body
        const name_upd = await db.query(`UPDATE category SET (name, parent) = ($1, $2) WHERE (category_id) = $3 RETURNING *`, [name, parent, id])
        return res.json(name_upd.rows)
        

    }
    
    async delete(req, res){
        const id = req.params.id
        const category = await db.query(`DELETE FROM category WHERE category_id = $1`, [id])
        return res.json(category.rows[0])
    }
}

module.exports = new CategoryController()