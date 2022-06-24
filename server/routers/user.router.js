const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.auth)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/', userController.update)
router.delete('/:id', userController.delete)
router.post('/checkClientIn', userController.checkClientIn)


module.exports = router