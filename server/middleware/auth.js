const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const prisma = require('../lib/prisma')

const auth = asyncHandler(async (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized.')
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    delete tokenData['iat']
    delete tokenData['exp']

    req.user = {
        ...tokenData
    }

    // const user = await prisma.user.findFirst({
    //     where: {
    //         id: req.user.id,
    //         organizationIDs: {
    //             has: req.user.organizationId
    //         }
    //     }
    // })

    // if(user) {
    //     console.log(user)
    // }

    next()

})

module.exports = auth