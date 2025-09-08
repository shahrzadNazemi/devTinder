const adminAuth = (req, res, next) => {
    let isAuthenticated = req.token === "xyz"
    if (!isAuthenticated) {
        res.status(401).send("admin is not authenticated")
    }
    next()
}
const userAuth = (req, res, next) => {
    let isAuthenticated = req.token === "xyz"
    if (!isAuthenticated) {
        res.status(401).send("user is not authenticated")
    }
    next()
}
module.exports = {
    adminAuth, userAuth
}