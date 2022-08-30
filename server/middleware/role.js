const ROLE = {
    VISITOR: 0x01,
    USER: 0x10,
    ADMIN: 0x11
}

const role = role => (req, res, next) => {
    const { role: userRole } = req.user

    if(!userRole) {
        res.status(403)
        throw new Error('Forbidden.')
    }

    const access = (0x11 & ROLE[userRole]) >= ROLE[role]

    if(!access) {
        res.status(403)
        throw new Error('User has not enough permissions to access this resource.')
    }

    next()
}

module.exports = role