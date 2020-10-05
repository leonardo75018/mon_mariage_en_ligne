const database = require("../models")
const generateToken = require("../functions/GenerateToke")
const bcrypt = require("bcrypt")
const passport = require("passport")


//Constante 
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;



class AdminControllers {

    //Création d'un compte admin
    static async createAdmin(req, res) {
        const { role, profile, firstName, lastName, email, password } = req.body
        const bcryptHash = await bcrypt.hash(password, 5);
        try {
            if (firstName === null || firstName === undefined || firstName === '') { return res.status(400).json({ error: "Le champ firstName n'est pas renseigné", }); }

            if (typeof firstName !== 'string') {
                return res.status(400).json({ error: 'Le champ firstName doit être une chaîne de caractères', });
            }

            if (!EMAIL_REGEX.test(email)) { return res.status(400).json({ 'error': 'email is not valid' }); }

            if (!PASSWORD_REGEX.test(password)) {
                return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
            }

            if (await database.Admin.findOne({ where: { email: email } }))
                return res.status(400).send("Cette adresse e-mail est déjà utilisée. Si c'est la votre veillez vous connectez ")

            const admin = await database.Admin.create({
                role: role, profile: profile, firstName: firstName, lastName: lastName, email: email, password: bcryptHash
            })

            return res.status(200).json({ admin, token: generateToken({ id: admin.id }) })


        } catch (err) { return res.status(500).json(err.message) }
    }

    static async takeAllAdmin(req, res) {
        try {
            const allAdmin = await database.Admin.findAll()
            return res.status(200).json({ allAdmin, id: req.userId })

        } catch (err) { return res.status(500).json(err.message) }
    }



    static async actualiserAdmin(req, res) {
        const newInfos = req.body
        const { id } = req.params
        try {
            await database.Admin.update(newInfos, { where: { id: Number(id) } })
            const AdminActualiser = await database.Admin.findOne({
                where: { id: Number(id) }
            })
            return res.status(200).json(AdminActualiser)

        } catch (err) { return res.status(500).json(err.message) }
    }

    static async deleteAdmin(req, res) {
        const { id } = req.params
        try {
            await database.Admin.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deleted` })

        } catch (err) { return res.status(500).json(err.message) }
    }


    static async AdminLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await database.Admin.findOne({ where: { email: email } })
            if (!user)
                return res.status(400).send({ error: "User not found" })

            if (!await bcrypt.compare(password, user.password))
                return res.status(400).send({ erro: "Invalid password" })

            user.password = undefined;
            const token = generateToken({ id: user.id })
            res.set("Authorization", token);

            return res.send({ user, token: generateToken({ id: user.id }) });

        } catch (err) { return res.status(500).json(err.message) }
    }


}
module.exports = AdminControllers;

