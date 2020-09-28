const database = require("../models")
const token = require("../functions/GenerateToke")


class UserControllers {
    static async takeAllUsers(req, res) {
        console.log(req.userId)
        try {
            const allUsers = await database.User.findAll()
            return res.status(200).json({ allUsers, id: req.userId })

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }



    static async createUser(req, res) {
        const dataUser = req.body
        try {

            if (await database.User.findOne({
                where: {
                    email: dataUser.email
                }
            }))
                return res.status(400).send("Cette adresse e-mail est déjà utilisée. Si c'est la votre veillez vous connectez ")

            const user = await database.User.create(dataUser)
            return res.status(200).json({
                user,
                GenerateToken: token({ id: user.id })
            }


            )

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }





}
module.exports = UserControllers; 