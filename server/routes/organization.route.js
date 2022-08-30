const route = require('express').Router()
const OrganizationController = require('../controllers/organization.controller')
const auth = require('../middleware/auth')

route.post('/create', auth, OrganizationController.CreateOrganization)
route.post('/login', auth, OrganizationController.LoginToOrganization)

module.exports = route