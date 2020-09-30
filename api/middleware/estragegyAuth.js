const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const passport = require("passport");
const database = require("../models")


//Model
const user = database.Admin;


module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {

        user.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                return done(null, false, { message: "cette compte n'existe pas" })
            }

            bcrypt.compare(password, user.password, (error, batem) => {
                if (batem) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: " password incorrecte" })
                }
            })
        })

    }))


    passport.serializeUser(function (user, done) {
        done(null, user)

    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });




}