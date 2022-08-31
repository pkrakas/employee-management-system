const asyncHandler = require('express-async-handler')
const prisma = require('../lib/prisma')

const GetDesignations = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const departments = await prisma.department.findMany({
        where: {
            organizationId
        },
        include: {
            designations: true
        }
    })
    res.send(departments)
})

const AddDesignation = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { title, departmentId } = req.body

    if(!title || !departmentId) {
        res.status(400)
        throw new Error('Please provide title and department id.')
    }

    const department = await prisma.department.findFirst({
        where: {
            id: departmentId,
            organizationId
        }
    })

    if(!department) {
        res.status(400)
        throw new Error('Department not found.')
    }

    const designation = await prisma.designation.create({
        data: {
            title,
            departmentId
        }
    })

    res.status(200).send(designation)
})

const EditDesignation = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { id } = req.params
    const { title } = req.body

    if(!id || ! title) {
        res.status(400)
        throw new Error('Please provide title and designation id.')
    }

    const currentDesignation = await prisma.designation.findUnique({
        where: {
            id
        },
        include: {
            department: true
        }
    })

    if(currentDesignation.department.organizationId !== organizationId) {
        res.status(400)
        throw new Error('Designation not found.')
    }
    
    const designation = await prisma.designation.update({
        where: {
            id
        },
        data: {
            title
        }
    })

    res.status(200).send(designation)
})

const DeleteDesignation = asyncHandler(async (req, res) => {
    const { organizationId } = req.user
    const { id } = req.params

    if(!id) {
        res.status(400)
        throw new Error('Please provide designation id.')
    }

    const currentDesignation = await prisma.designation.findUnique({
        where: {
            id
        },
        include: {
            department: true
        }
    })

    if(currentDesignation.department.organizationId !== organizationId) {
        res.status(400)
        throw new Error('Designation not found.')
    }

    await prisma.designation.delete({
        where: {
            id
        }
    })

    res.send()
})

module.exports = {
    GetDesignations,
    AddDesignation,
    EditDesignation,
    DeleteDesignation
}