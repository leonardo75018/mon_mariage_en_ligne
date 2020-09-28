const database = require("../models");
const UserControllers = require("./UserControllers");
const token = require("../functions/GenerateToke")


class AuthController {


    static async auth(req, res) {


        const { email, password } = req.body;
        try {
            const user = await database.User.findOne({
                where: {
                    email: email,
                    password: password
                }
            })

            return res.status(200).send({
                user,
                GenerateToke: token({ id: user.id })
            })




        } catch (err) {
            return res.status(500).json(err.message)

        }
    }



}
module.exports = AuthController; 