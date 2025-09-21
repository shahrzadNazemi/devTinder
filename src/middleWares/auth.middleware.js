
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const adminAuth = (req, res, next) => {
    let token = "xyz"

    let isAuthenticated = token === "xyz"
    if (!isAuthenticated) {
        res.status(401).send("admin is not authenticated")
    } else {
        next()
    }

}
const userAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            throw new Error("invalid token")
        }
        let { userId } = await jwt.verify(token, "secret")

        let user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error('user not found')
        }
        req.user = user
        next()

    } catch (error) {
        res.status(401).send('not authorized' + error.message)
    }

}
module.exports = {
    adminAuth, userAuth
}