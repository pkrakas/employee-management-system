const route = require('express').Router()
const UserController = require('../controllers/user.controller')
const auth = require('../middleware/auth')

route.post('/register', UserController.AddUser)
route.post('/login', UserController.LoginUser)
route.post('/verifyToken', UserController.VerifyToken)
route.get('/organizations', auth, UserController.GetUserOrganizations)

module.exports = route