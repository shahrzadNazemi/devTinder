const express = require('express')
const { adminAuth, userAuth } = require('./middleWares/auth.middleware')
const { dbConnection } = require('./configs/database')
const { signUpValidation } = require('./utils/validation')
const cookieParser = require('cookie-parser')
const { User } = require('./models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/admin', adminAuth)

app.get('/admin/getAllData', (req, res) => {
    res.send("admin data sent")
})

app.delete("/admin/deleteData", (req, res) => {
    res.send("admin data deleted")
})

app.get('/user/getData', userAuth, async (req, res) => {
    try {

        let user = req.user
        res.send(user)
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})
app.post("/user/signup", async (req, res) => {
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
app.post("/user/login", async (req, res) => {

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
app.patch("/user/:id", async (req, res) => {
    let userId = req.params.id
    try {
        await User.findOneAndUpdate({ _id: userId }, req.body, { runValidators: true })
        res.send("user is updated")
    } catch (err) {
        res.status(500).send("error" + err.message)
    }

})
dbConnection().then(() => {
    console.log("db connected successfully")
    app.listen(3000, () => {
        console.log("server is listening on 3000")
    })
}).catch(() => {
    console.error("db not connected")
})
