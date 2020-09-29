const { Router } = require("express")
const ImageControllers = require("../controllers/imageControllers")
const auth = require("../middleware/auth")


const router = Router();

router.post("/application/create/image", ImageControllers.createImage)
router.get("/application/find/images", auth, ImageControllers.takeAllImages)
router.post("/application/deleteImage/:id", ImageControllers.deleteImage)
router.put("/application/actualiseImage/:id", ImageControllers.actualiserImage)

module.exports = router; 