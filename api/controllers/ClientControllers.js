const database = require("../models")
const GenerateToken = require("../functions/GenerateToke")
const bcrypt = require("bcrypt")





//Constante 
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;


class ClientControllers {

    //Création d'un compte cleint
    static async createClient(req, res) {
        const { role, profile, firstName, lastName, email, telephoe, password } = req.body
        const bcryptHash = await bcrypt.hash(password, 5);

        try {

            if (firstName === null || firstName === undefined || firstName === '') {
                return res.status(400).json({
                    error: "Le champ firstName n'est pas renseigné",
                });
            }

            if (typeof firstName !== 'string') {
                return res.status(400).json({
                    error: 'Le champ firstName doit être une chaîne de caractères',
                });
            }

            if (!EMAIL_REGEX.test(email)) {
                return res.status(400).json({ 'error': 'email is not valid' });
            }

            if (!PASSWORD_REGEX.test(password)) {
                return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
            }


            if (await database.Client.findOne({
                where: {
                    email: email
                }
            }))
                return res.status(400).send("Cette adresse e-mail est déjà utilisée. Si c'est la votre veillez vous connectez ")

            const client = await database.Client.create({
                role: role,
                profile: profile,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: bcryptHash
            })
            client.password = undefined;


            return res.status(200).json({
                client,
                token: GenerateToken({ id: client.id })
            })

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }

    static async takeAllClients(req, res) {
        try {
            const allClients = await database.Client.findAll()
            return res.status(200).json({ allClients, id: req.userId })

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }



    static async actualiserClient(req, res) {
        const newInfos = req.body
        const { id } = req.params
        try {
            await database.Client.update(newInfos, { where: { id: Number(id) } })
            const clientActualiser = await database.Client.findOne({
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
            await database.Client.destroy({
                where: { id: Number(id) }
            })
            return res.status(200).json({ message: `id ${id} deleted` })

        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async clientLogin(req, res) {
        const { email, password } = req.body;

        try {
            const client = await database.Client.findOne({
                where: { email: email, }
            })
            if (!client)
                return res.status(400).send({ error: "User not found" })

            if (!await bcrypt.compare(password, client.password))
                return res.status(400).send({ erro: "Invalid password" })

            client.password = undefined;
            const token = GenerateToken({ id: client.id })
            res.set("Authorization", token);

            return res.send({ client, token });
        } catch (err) { return res.status(500).json(err.message) }
    }






}
module.exports = ClientControllers;

