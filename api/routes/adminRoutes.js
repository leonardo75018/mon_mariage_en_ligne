const { Router } = require("express")
const AdminControllers = require("../controllers/AdminControllers")
const ClientControllers = require("../controllers/ClientControllers")
const auth = require("../middleware/auth")
const passport = require("passport")
const isadmin = require("../middleware/isAdmin")

const router = Router();

// passport.authenticate("local.admin", { session: false }),



//Admin   il faut rajouter le Midlleware is admin
router.post("/application/admin/login", AdminControllers.AdminLogin)
router.post("/application/register/admin", auth, AdminControllers.createAdmin)
router.post("/application/find/admin", auth, AdminControllers.takeAllAdmin)
router.post("/application/deleteAdmin/:id", auth, AdminControllers.deleteAdmin)
router.put("/application/actualiserAdmin/:id", auth, AdminControllers.actualiserAdmin)

//client  il faut rajouter le Midlleware is admin
router.post("/application/create/client", ClientControllers.createClient)
router.get("/application/find/client", auth, ClientControllers.takeAllClients)
router.put("/application/actualiserClient/:id", auth, ClientControllers.actualiserClient)
router.post("/application/deleteClient/:id", auth, ClientControllers.deleteClient)



router.post("/application/logout", (req, res) => {
    req.logOut;
    res.redirect("/")
})


module.exports = router; 