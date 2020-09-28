const { Router } = require("express")
const UserControllers = require("../controllers/UserControllers")

const router = Router();

router.post("/application/register", UserControllers.createUser)

module.exports = router; 