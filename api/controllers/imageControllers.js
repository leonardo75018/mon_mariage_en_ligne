const database = require("../models")



class ImageControllers {
    static async takeAllImages(req, res) {

        try {
            const allimages = await database.image.findAll()
            return res.status(200).json(allimages)

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }

    static async createImage(req, res) {
        const dataImage = req.body
        try {


            const image = await database.image.create(dataImage)
            return res.status(200).json(image)

        } catch (err) {
            return res.status(500).json(err.message)

        }
    }


    static async actualiserImage(req, res) {
        const newInfos = req.body
        const { id } = req.params
        try {
            await database.image.update(newInfos, { where: { id: Number(id) } })
            const imageActualiser = await database.client.findOne({
                where: { id: Number(id) }
            })
            return res.status(200).json(imageActualiser)



        } catch (err) {
            return res.status(500).json(err.message)

        }
    }

    static async deleteImage(req, res) {
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
module.exports = ImageControllers;

