const database = require("../models")
const token = require("../functions/GenerateToke")


class ClientControllers {
    static async takeAllClients(req, res) {
        // console.log(req.userId)
        try {
            const allClients = await database.client.findAll()
            return res.status(200).json({ allClients, id: req.userId })

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }

    static async createClient(req, res) {
        const dataClient = req.body
        try {

            if (await database.client.findOne({
                where: {
                    email: dataClient.email
                }
            }))
                return res.status(400).send("Cette adresse e-mail est déjà utilisée. Si c'est la votre veillez vous connectez ")

            const client = await database.client.create(dataClient)
            return res.status(200).json({
                client,
                GenerateToken: token({ id: client.id })
            }


            )

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }


    static async actualiserClient(req, res) {
        const newInfos = req.body
        const { id } = req.params
        try {
            await database.client.update(newInfos, { where: { id: Number(id) } })
            const clientActualiser = await database.client.findOne({
                where: { id: Number(id) }
            })
            return res.status(200).json(clientActualiser)



        } catch (err) {
            return res.status(500).json(err.message)

        }
    }

    static async deleteClient(req, res) {
        const { id } = req.params
        try {
            await database.client.destroy({
                where: { id: Number(id) }
            })
            return res.status(200).json({ message: `id ${id} deleted` })



        } catch (err) {
            return res.status(500).json(err.message)

        }
    }






}
module.exports = ClientControllers;

