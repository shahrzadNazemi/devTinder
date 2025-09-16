const adminAuth = (req, res, next) => {
    let token = "xyz"

    let isAuthenticated = token === "xyz"
    if (!isAuthenticated) {
        res.status(401).send("admin is not authenticated")
    } else {
        next()
    }

}
const userAuth = (req, res, next) => {
    let token = "xyz"
    let isAuthenticated = token === "xyz"
    if (!isAuthenticated) {
        res.status(401).send("user is not authenticated")
    }
    else {
        next()
    }

}
module.exports = {
    adminAuth, userAuth
}