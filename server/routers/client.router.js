const Router = require('express')
const router = new Router()
const ClientController = require('../controllers/client.controller')

router.post('/checkClientIn', ClientController.checkClientIn)
router.post('/addToBasket', ClientController.addToBasket)
router.get('/getBasketItems/:id', ClientController.getBasketItems)
router.delete('/deleteFromBasket/:id', ClientController.deleteFromBasket)
router.get('/CarttoOrder/:id', ClientController.CarttoOrder)
router.get('/getCurrentOrders/:id', ClientController.getCurrentOrders)
router.get('/getOrderItemsByClientID/:id', ClientController.getOrderItemsByClientID)
router.get('/getServedOrderItems/:id', ClientController.getServedOrderItems)
router.get('/getOrderItem/:id', ClientController.getOrderItem)
router.delete('/deleteFromOrder/:id', ClientController.deleteFromOrder)
router.put('/dishServed/:id', ClientController.dishServed)
router.put('/callWaiter/:id', ClientController.callWaiter)
router.put('/waiterArrived/:id', ClientController.waiterArrived)
router.put('/finishOrder/:id', ClientController.finishOrder)
router.get('/getOrderHistoryClient/:id', ClientController.getOrderHistoryClient)
router.get('/getOrderHistoryRestaurant/:id', ClientController.getOrderHistoryRestaurant)
router.get('/getOrderItemsByOrderID/:id', ClientController.getOrderItemsByOrderID)
router.get('/getOrderByID/:id', ClientController.getOrderByID)




module.exports = router