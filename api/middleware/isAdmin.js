const database = require("../models")



module.exports = async (req, res, next) => {

    const admin = await database.Admin.findOne({ where: { id: req.userId } })
    if (admin._previousDataValues.role === "admin") {
        next()
    }
    else { return res.status(400).send("il faut etre admin pour déclencher cette action") }
    return res.status(200).send()
}


