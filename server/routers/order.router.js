const Router = require('express')
const router = new Router()
const orderController = require('../controllers/order.controller')

router.get('/getCurrentOrders/:id', orderController.getCurrentOrders)
router.get('/getOrderItemsByClientID/:id', orderController.getOrderItemsByClientID)
router.get('/getServedOrderItemsByClientID/:id', orderController.getServedOrderItemsByClientID)
router.get('/getOrderItem/:id', orderController.getOrderItem)
router.delete('/deleteFromOrder/:id', orderController.deleteFromOrder)
router.put('/dishServed/:id', orderController.dishServed)
router.put('/callWaiter/:id', orderController.callWaiter)
router.put('/waiterArrived/:id', orderController.waiterArrived)
router.put('/finishOrder/:client_id', orderController.finishOrder)
router.get('/getOrderHistoryClient/:id', orderController.getOrderHistoryClient)
router.get('/getOrderHistoryRestaurant/:id', orderController.getOrderHistoryRestaurant)
router.get('/getOrderItemsByOrderID/:id', orderController.getOrderItemsByOrderID)
router.get('/getOrderByID/:id', orderController.getOrderByID)

module.exports = router