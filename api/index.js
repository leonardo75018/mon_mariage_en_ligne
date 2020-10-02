
const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require('dotenv').config();


//Session config
app.use(session({
    secret: "zerLM?Tlnj:kh;",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


require("./middleware/EstategieAth")(passport)


app.use(passport.initialize())

routes(app)



app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`)
})

module.exports = app; 