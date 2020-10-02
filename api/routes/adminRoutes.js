const { Router } = require("express")
const AdminControllers = require("../controllers/AdminControllers")
const ClientControllers = require("../controllers/ClientControllers")
const auth = require("../middleware/auth")
const passport = require("passport")
const isadmin = require("../middleware/isAdmin")

const router = Router();



//Admin   il faut rajouter le Midlleware is admin
router.post("/application/admin/login", passport.authenticate("local.admin", { session: false }), AdminControllers.AdminLogin)
router.post("/application/register/admin", auth, isadmin, AdminControllers.createAdmin)
router.get("/application/find/admin", auth, AdminControllers.takeAllAdmin)
router.post("/application/deleteAdmin/:id", auth, isadmin, AdminControllers.deleteAdmin)
router.put("/application/actualiserAdmin/:id", auth, isadmin, AdminControllers.actualiserAdmin)

//client  il faut rajouter le Midlleware is admin
router.post("/application/create/client", auth, isadmin, ClientControllers.createClient)
router.get("/application/find/client", auth, isadmin, ClientControllers.takeAllClients)
router.put("/application/actualiserClient/:id", auth, ClientControllers.actualiserClient)
router.post("/application/deleteClient/:id", auth, isadmin, ClientControllers.deleteClient)




router.post("/application/logout", (req, res) => {
    req.logOut;
    res.redirect("/")
})


module.exports = router; 