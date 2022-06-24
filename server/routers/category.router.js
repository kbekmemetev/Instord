const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/category.controller')

router.post('/', categoryController.create)
router.get('/getall/:restaurant_id', categoryController.getAll)
router.get('/getRootCategories/:restaurant_id/', categoryController.getRootCategories)
router.get('/getbyparent/:parent_id', categoryController.getCategoryByParent)
router.put('/', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router