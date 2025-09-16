const validate = require('validator')

const signUpValidation = (req) => {
    const { firstName, lastName, password, emailId } = req.body

    if (firstName.length < 4 || lastName.length < 4) {
        throw new Error('Name should be sent')
    }
    if (!emailId) {
        throw new Error('email should be sent')

    }
    if (!validate.isEmail(emailId)) {
        throw new Error('email is not valid')
    }
}

module.exports = {
    signUpValidation
}