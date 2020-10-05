const { Router } = require("express")
const photoControllers = require("../controllers/photoControllers")
const auth = require("../middleware/auth")


const router = Router();

router.post("/application/create/image", photoControllers.createPhoto)
router.get("/application/find/images", auth, photoControllers.takeAllIphotos)
router.post("/application/deleteImage/:id", photoControllers.deletePhoto)
router.put("/application/actualiseImage/:id", photoControllers.actualiserPhoto)

module.exports = router; 