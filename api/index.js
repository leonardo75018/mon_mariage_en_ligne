
const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes")
const passport = require("passport")
const session = require("express-session")
const flash = require("connect-flash")


require("./middleware/estragegyAuth")(passport)



//Config session 
app.use(session({
    secret: "cursonode",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())




routes(app)






app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`)
})

module.exports = app; 