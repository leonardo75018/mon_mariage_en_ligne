const database = require("../models")



class ImageControllers {

    static async createPhoto(req, res) {
        const dataImage = req.body
        try {
            const image = await database.Photo.create(dataImage)
            return res.status(200).json(image)
        } catch (err) { return res.status(500).json(err.message) }
    }

    static async takeAllIphotos(req, res) {
        try {
            const allimages = await database.Photo.findAll()
            return res.status(200).json(allimages)

        } catch (err) { return res.status(500).json(err.message) }
    }


    static async actualiserPhoto(req, res) {
        const newInfos = req.body
        const { id } = req.params
        try {
            await database.Photo.update(newInfos, { where: { id: Number(id) } })
            const imageActualiser = await database.Photo.findOne({ where: { id: Number(id) } })
            return res.status(200).json(imageActualiser)
        } catch (err) { return res.status(500).json(err.message) }
    }


    static async deletePhoto(req, res) {
        const { id } = req.params
        try {
            await database.Photo.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deleted` })
        } catch (err) { return res.status(500).json(err.message) }
    }


    static async clienPhoto(req, res) {
        try {
            console.log(req.userId)
            const allimages = await database.Photo.findAll({ where: { idClient: req.userId } })
            return res.status(200).json(allimages)
        } catch (err) { return res.status(500).json(err.message) }
    }
}
module.exports = ImageControllers;



