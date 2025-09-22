const express = require('express')
const authRouter = express.Router()
const { signUpValidation } = require('../utils/validation')
const { User } = require('../models/user')
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {
    let { firstName, lastName, password, emailId } = req.body
    try {
        signUpValidation(req)
        let hashPassword = await bcrypt.hash(password, 10)
        let user = new User({ firstName, lastName, password: hashPassword, emailId })
        await user.save()
        res.send("user is signedUp")
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})
authRouter.post("/login", async (req, res) => {

    let { password, emailId } = req.body
    try {
        let user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("invalid")
        }
        let isValidPassword = user.comparePass(password)
        if (!isValidPassword) {
            throw new Error("invalid")

        }
        let token = await user.setJWT()
        res.cookie('token', token)
        res.send("user is loggedIn")
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})
authRouter.post("/logout", async (req, res) => {

    try {

        res.cookie('token', null, { expires: new Date() })
        res.send("user is loggedOut")
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})

module.exports = {
    authRouter
}