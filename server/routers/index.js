const Router = require('express')
const router = new Router()
const basketRouter = require('./basket.router')
const categoryRouter = require('./category.router')
const itemRouter = require('./item.router')
const orderRouter = require('./order.router')
const restaurantRouter = require('./restaurant.router')
const userRouter = require('./user.router')
const clientRouter = require('./client.router')


router.use('/basket', basketRouter)
router.use('/category', categoryRouter)
router.use('/item', itemRouter)
router.use('/order', orderRouter)
router.use('/restaurant', restaurantRouter)
router.use('/user', userRouter)



module.exports = router