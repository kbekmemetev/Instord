const Router = require('express')
const router = new Router()
const itemController = require('../controllers/item.controller')

router.post('/', itemController.create)
router.get('/getall/:category_id', itemController.getAll)
router.get('/getallForUnderaged/:id', itemController.getAllForUnderaged)
router.get('/:id', itemController.getOne)
router.put('/', itemController.update)
router.delete('/:id', itemController.delete)

module.exports = router