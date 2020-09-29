const { Router } = require("express")
const AdminControllers = require("../controllers/AdminControllers")
const auth = require("../middleware/auth")

const router = Router();

router.post("/application/register/admin", AdminControllers.createAdmin)
router.get("/application/find/admin", auth, AdminControllers.takeAllAdmin)
router.post("/application/deleteAdmin/:id", AdminControllers.deleteAdmin)
router.put("/application/actualiserAdmin/:id", AdminControllers.actualiserAdmin)
router.post("/application/admin", AdminControllers.AdminLogin)

module.exports = router; 