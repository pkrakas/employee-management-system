const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const CreateOrganization = asyncHandler(async (req, res) => {
    const { organizationName } = req.body

    if(!organizationName) {
        res.status(400)
        throw new Error('Please provide organization name.')
    }

    const newOrganization = await prisma.organization.create({
        data: {
            name: organizationName,
            userIDs: {
                set: [req.user.id]
            }
        }
    })

    await prisma.organizationRoles.create({
        data: {
            role: 'ADMIN',
            userId: req.user.id,
            organizationId: newOrganization.id
        }
    })

    await prisma.user.update({
        where: {
            email: req.user.email
        },
        data: {
            organizationIDs: {
                push: newOrganization.id
            }
        }
    })

    res.status(200).send()
})

const LoginToOrganization = asyncHandler(async (req, res) => {
    const { organizationId } = req.body
    
    const userOrganizationRole = await prisma.organizationRoles.findFirst({
        where: {
            userId: req.user.id,
            organizationId
        },
        include: {
            organization: true
        }
    })

    if(!userOrganizationRole) {
        res.status(400)
        throw new Error('No user organization role found.')
    }

    const payload = {
        id: req.user.id,
        email: req.user.email,
        organizationId,
        organizationName: userOrganizationRole.organization.name,
        role: userOrganizationRole.role
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.send({
        token: accessToken
    })
    
})

module.exports = {
    CreateOrganization,
    LoginToOrganization
}