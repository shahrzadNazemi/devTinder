const express = require('express')
const { dbConnection } = require('./configs/database')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { authRouter } = require('./routes/auth')
const { profileRouter } = require('./routes/profile')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/profile', profileRouter)

dbConnection().then(() => {
    console.log("db connected successfully")
    app.listen(3000, () => {
        console.log("server is listening on 3000")
    })
}).catch(() => {
    console.error("db not connected")
})
