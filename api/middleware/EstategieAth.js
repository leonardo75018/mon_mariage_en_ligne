const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const passport = require("passport");
const database = require("../models")


//Model
const user = database.Admin;
const client = database.Client;



const { InvalidArgumentError } = require('../error/error');
function verifyUser(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Pas de compte avec cette adresse e-mail!');
    }
}

async function verifyPassword(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('E-mail ou Password invalide!');
    }
}



//https://github.com/jaredhanson/passport/issues/287

module.exports = function (passport) {
    passport.use("local.admin",
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false
            },
            async (email, password, done) => {
                try {
                    const usuario = await user.findOne({ where: { email: email } })
                    verifyUser(usuario);
                    await verifyPassword(password, usuario.password);

                    done(null, usuario);
                } catch (erro) {
                    done(erro);
                }
            }
        )
    );

    passport.use("local.client",
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false
            },
            async (email, password, done) => {
                try {
                    const usuario = await client.findOne({ where: { email: email } })
                    verifyUser(usuario);
                    await verifyPassword(password, usuario.password);

                    done(null, usuario);
                } catch (erro) {
                    done(erro);
                }
            }
        )
    );


    passport.serializeUser(function (usuario, done) {
        done(null, usuario.id)

    });
    passport.deserializeUser(function (id, done) {
        user.findById(id, (err, user))
        done(null, user);
    });

}
