const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    emailId: {
        type: String
    },
    age: {
        type: Number
    }
})

const User = mongoose.model("User", userSchema)
module.exports = {
    User
}