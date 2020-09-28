const jwt = require("jsonwebtoken")
const authconfig = require("../config/auth.json")



module.exports = function GenerateToke(params = {}) {
    return jwt.sign(params, authconfig.secret, {
        expiresIn: 86400,

    });
}