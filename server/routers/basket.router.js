const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket.controller')

router.post('/addToBasket', basketController.addToBasket)
router.get('/getBasketItems/:user_id', basketController.getBasketItems)
router.get('/getBasketItem/:bi_id', basketController.getBasketItem)
router.delete('/deleteFromBasket/:id', basketController.deleteFromBasket)
router.get('/CarttoOrder/:id', basketController.CarttoOrder)

module.exports = router