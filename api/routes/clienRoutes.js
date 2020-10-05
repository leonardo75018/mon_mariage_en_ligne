const { Router } = require("express")
const ClientControllers = require("../controllers/ClientControllers")
const photoControllers = require("../controllers/photoControllers")
const auth = require("../middleware/auth")
const passport = require("passport")
const isAdmin = require("../middleware/isAdmin")


const router = Router();




// passport.authenticate("local.client"),

//login  //find les photos 
router.post("/application/client/login", ClientControllers.clientLogin)
router.get("/application/client/accueil", auth, photoControllers.clienPhoto)


//télécharger toules les photos
//télécharger une photo
router.put("/application/actualiserClient/:id", ClientControllers.actualiserClient)


module.exports = router; 