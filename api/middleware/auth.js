const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth.json");
const { json } = require("body-parser");


module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided"
        })
    }

    const parts = token.split(" ");

    if (!parts.length === 2)
        return res.status(401).send({ error: "token error" });


    jwt.verify(token, authconfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "token invalide" });
        req.userId = decoded.id;
        return next()
    });
};