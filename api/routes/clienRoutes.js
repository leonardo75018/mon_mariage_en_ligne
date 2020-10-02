const { Router } = require("express")
const ClientControllers = require("../controllers/ClientControllers")
const imageControllers = require("../controllers/imageControllers")
const auth = require("../middleware/auth")
const passport = require("passport")
const isAdmin = require("../middleware/isAdmin")


const router = Router();




//login  //find les photos 
router.post("/application/client/login", passport.authenticate("local.client"), ClientControllers.clientLogin)
router.get("/application/client/accueil", auth, isAdmin, imageControllers.ImagesClient)


//télécharger toules les photos
//télécharger une photo
router.put("/application/actualiserClient/:id", ClientControllers.actualiserClient)



module.exports = router; 