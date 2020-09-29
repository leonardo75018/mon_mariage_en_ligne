const database = require("../models");
const token = require("../functions/GenerateToke")


class AuthController {


    static async auth(req, res) {


        const { email, password } = req.body;
        try {
            const user = await database.Admin.findOne({
                where: {
                    email: email,
                    password: password
                }
            })

            return res.status(200).send(user)




        } catch (err) {
            return res.status(500).json(err.message)

        }
    }



}
module.exports = AuthController; 