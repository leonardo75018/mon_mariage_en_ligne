const bodyParser = require("body-parser")
const findUsers = require("./usersRoute")
const createUser = require("./createUser")
const authentification = require("./authentification")


module.exports = app => {
    app.use(bodyParser.json())
    app.use(createUser)
    app.use(findUsers)
    app.use(authentification)

}