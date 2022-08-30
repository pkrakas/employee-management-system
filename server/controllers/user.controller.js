const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const AddUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide email and password.')
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(userExists) {
        res.status(400)
        throw new Error('Account already registered.')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    res.status(200).send()

})

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide email and password.')
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user) {
        res.status(400)
        throw new Error('Account not registered.')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        res.status(401)
        throw new Error('Wrong email or password.')
    }

    const payload = {
        id: user.id,
        email: user.email,
        organizationId: null,
        role: null
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    })

    res.status(200).send({
        token: accessToken
    })

})

const VerifyToken = asyncHandler(async (req, res) => {
    const { token } = req.body
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.status(200).send()
    } catch(error) {
        res.status(401)
        throw new Error('Token not verified.')
    }

})

const GetUserOrganizations = asyncHandler(async (req, res) => {

    const { organizations } = await prisma.user.findUnique({
        where: {
            email: req.user.email
        },
        select: {
            organizations: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    res.send(organizations)

})

module.exports = {
    AddUser,
    LoginUser,
    VerifyToken,
    GetUserOrganizations
}