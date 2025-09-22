const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middleWares/auth.middleware')
const { User } = require('../models/user')

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {

        let user = req.user
        res.send(user)
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})

profileRouter.patch("/profile/edit/:id", async (req, res) => {
    let userId = req.params.id
    try {
        await User.findOneAndUpdate({ _id: userId }, req.body, { runValidators: true })
        res.send("user is updated")
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})


module.exports = {
    profileRouter
}