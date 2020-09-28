const { Router } = require("express")
const authentification = require("../controllers/AuthController")


const router = Router();

router.post("/application/authentification", authentification.auth)

module.exports = router; 