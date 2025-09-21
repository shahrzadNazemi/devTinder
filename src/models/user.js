const mongoose = require('mongoose')
const validate = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true

    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true


    },
    gender: {
        type: String,
        required: function () {
            return this.age > 18;
        },
        validate: (value) => {
            if (!['male', 'female'].includes(value)) {
                throw new Error('gender is not valid')
            }

        }
    },
    photoUrl: {
        type: String,
        // validate: (value) => {
        //     if (!validate.isURL(value)) {
        //         throw new Error('photo is not valid url')
        //     }
        // },
        default: ''
    },


    emailId: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true

    },
    password: {
        type: String,

    },
    age: {
        type: Number,
        min: 18
    }
}, { timestamps: true })


userSchema.methods.setJWT = async function () {
    let token = await jwt.sign({ userId: this._id }, "secret")
    return token
}
userSchema.methods.comparePass = async function (inputPass) {
   return await bcrypt.compare(inputPass, this.password)
}
const User = mongoose.model("User", userSchema)
module.exports = {
    User
}