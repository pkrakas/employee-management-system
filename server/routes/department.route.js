const route = require('express').Router()
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const DepartmentController = require('../controllers/department.controller')

route.get('/', auth, role('VISITOR'), DepartmentController.GetDepartments)
route.post('/', auth, role('ADMIN'), DepartmentController.AddDepartment)
route.patch('/:id', auth, role('ADMIN'), DepartmentController.EditDepartment)
route.delete('/:id', auth, role('ADMIN'), DepartmentController.DeleteDepartment)

module.exports = route