const db = require(`../db`)
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (person_id, email, role) => {
    return jwt.sign(
        {person_id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        
        const emailCheck = (await db.query(`SELECT * FROM person WHERE email= $1;`, [email])).rows
        if (emailCheck.length  !=  0) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await db.query('INSERT INTO person (email, password, role) values ($1, $2, $3) RETURNING *', [email, hashPassword, role])
        const newUser = (await db.query(`SELECT * FROM person WHERE email= $1;`, [email])).rows
        const token = generateJwt(newUser[0]['person_id'], newUser[0]['email'], newUser[0]['role'])

        



        if (newUser[0]['role'] == "USER") {

            const basket = db.query('INSERT INTO basket (person_id) values ($1) RETURNING *', [newUser[0]['person_id']])

        } else {
            const admin = db.query('UPDATE person SET restaurant_id = $1 WHERE person_id = $1  RETURNING *', [newUser[0]['person_id']])
        }

        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = (await db.query(`SELECT * FROM person WHERE email= $1;`, [email])).rows

        if (user.length == 0) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user[0]['password'])
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user[0]['person_id'], user[0]['email'], user[0]['role'])
        return res.json({token})
    }

    async auth(req, res, next){
        const token = generateJwt(req.user.person_id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res){
        const users = await db.query(`SELECT * FROM person`)
        return res.json(users.rows)
    }

    async getOne(req, res){
        const id = req.params.id
        const user = await db.query(`SELECT * FROM person WHERE person_id = $1`, [id])
        return res.json(user.rows[0])
    }

    async update(req, res){
        const {id, email} = req.body
        const user = await db.query(`UPDATE person SET email = $1 WHERE person_id = $2`, [email, id])
        return res.json(user.rows[0])
    }
    
    async delete(req, res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM person WHERE person_id = $1`, [id])
        return res.json(user.rows[0])
    }

    async checkClientIn(req, res){
        const {restaurant_id, client_id, table, reached_majority_age} = req.body
        const user_upd = await db.query ('UPDATE person SET status = $1, reached_majority_age = $2 WHERE person_id = $3 RETURNING *', [restaurant_id, reached_majority_age, client_id])
        const order = await db.query ('INSERT INTO orders (person_id, restaurant_id, table_number, status) values ($1, $2, $3, $4) RETURNING *', [client_id, restaurant_id, table, 'CURRENT'])
        return res.json(order.rows[0])
    }

}

module.exports = new UserController()