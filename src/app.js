const express = require('express')
const { adminAuth, userAuth } = require('./middleWares/auth.middleware')
const { dbConnection } = require('./configs/database')
const { User } = require('./models/user')
const app = express()
app.use(express.json())
app.use('/admin', adminAuth)

app.get('/admin/getAllData', (req, res) => {
    res.send("admin data sent")
})

app.delete("/admin/deleteData", (req, res) => {
    res.send("admin data deleted")
})

app.get('/user/getData', userAuth, (req, res) => {
    res.send("user data sent")
})
app.post("/user/signup", async (req, res) => {
    let userObj = req.body
    try {
        let user = new User(userObj)
        await user.save()
        res.send("user is signedUp")
    } catch (err) {
        res.status(500).send("error")
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
