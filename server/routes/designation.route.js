const route = require('express').Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const DesignationController = require('../controllers/designation.controller')

route.get('/', auth, role('VISITOR'), DesignationController.GetDesignations)
route.post('/', auth, role('ADMIN'), DesignationController.AddDesignation)
route.patch('/:id', auth, role('ADMIN'), DesignationController.EditDesignation)
route.delete('/:id', auth, role('ADMIN'), DesignationController.DeleteDesignation)

module.exports = route