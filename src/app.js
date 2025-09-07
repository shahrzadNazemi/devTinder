const express = require('express')

const app = express()
app.use('/test', (req, res) => {
    res.send("Hello from here")
})
app.listen(3000, () => {
    console.log("server is listening on 3000")
})