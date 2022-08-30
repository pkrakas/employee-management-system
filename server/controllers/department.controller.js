const asyncHandler = require('express-async-handler')
const prisma = require('../lib/prisma')

const GetDepartments = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const departments = await prisma.department.findMany({
        where: {
            organizationId
        }
    })
    res.send(departments)
})

const AddDepartment = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { title } = req.body

    if(!title) {
        res.status(400)
        throw new Error('Please provide department title.')
    }

    const newDepartment = await prisma.department.create({
        data: {
            title,
            organizationId
        }
    })

    res.send(newDepartment)
})

const EditDepartment = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { title } = req.body
    const { id } = req.params

    if(!id) {
        res.status(400)
        throw new Error('Please provide department id.')
    }

    if(!title) {
        res.status(400)
        throw new Error('Please provide department title.')
    }

    const department = await prisma.department.findFirst({
        where: {
            id,
            organizationId
        }
    })

    if(!department) {
        res.status(400)
        throw new Error('Department not found.')
    }

    const updatedDepartment = await prisma.department.update({
        where: {
            id
        },
        data: {
            title
        }
    })

    res.send(updatedDepartment)

})

const DeleteDepartment = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { id } = req.params

    if(!id) {
        res.status(400)
        throw new Error('Please provide department id.')
    }

    const department = await prisma.department.findFirst({
        where: {
            id,
            organizationId
        }
    })

    if(!department) {
        res.status(400)
        throw new Error('Department not found.')
    }

    const deleteDepartment = await prisma.department.delete({
        where: {
            id
        }
    })

    res.send()
})

module.exports = {
    GetDepartments,
    AddDepartment,
    EditDepartment,
    DeleteDepartment
}