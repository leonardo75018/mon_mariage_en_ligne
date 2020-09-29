const bodyParser = require("body-parser")
const adminRoutes = require("./adminRoutes")
const clienRoutes = require("./clienRoutes.js")
const imageRoute = require("./imageRoute")


const authentification = require("./authentification")

module.exports = app => {
    app.use(bodyParser.json())
    app.use(adminRoutes)
    app.use(clienRoutes)
    app.use(imageRoute)


}