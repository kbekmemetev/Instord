const Router = require('express')
const router = new Router()
const restaurantController = require('../controllers/restaurant.controller')

router.post('/', restaurantController.create)
router.get('/', restaurantController.getAll)
router.get('/:id', restaurantController.getOne)
router.put('/', restaurantController.update)
router.delete('/:id', restaurantController.delete)

module.exports = router