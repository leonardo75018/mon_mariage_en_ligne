
const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes")
const passport = require("passport")
require("./middleware/estragegyAuth")(passport)
require('dotenv').config()



app.use(passport.initialize())

routes(app)



app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`)
})

module.exports = app; 