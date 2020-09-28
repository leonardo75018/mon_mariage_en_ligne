const { Router } = require("express")
const UserControllers = require("../controllers/UserControllers")
const auth = require("../middleware/auth")

const router = Router();

router.get("/application/users", auth, UserControllers.takeAllUsers)

module.exports = router; 