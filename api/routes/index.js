const bodyParser = require("body-parser")
const adminRoutes = require("./adminRoutes")
const clienRoutes = require("./clienRoutes.js")
const photoRoute = require("./photosRoute")



module.exports = app => {
    app.use(bodyParser.json())
    app.use(adminRoutes)
    app.use(clienRoutes)
    app.use(photoRoute)


}