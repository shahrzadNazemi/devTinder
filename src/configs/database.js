const mongoose = require('mongoose')


const dbConnection = async () => {
    await mongoose.connect("mongodb://localhost:27017/content")
}
module.exports={
    dbConnection
}
