const { Router } = require("express")
const ClientControllers = require("../controllers/ClientControllers")
const auth = require("../middleware/auth")

const router = Router();

router.post("/application/register/client", ClientControllers.createClient)
router.get("/application/find/client", auth, ClientControllers.takeAllClients)
router.post("/application/deleteClient/:id", ClientControllers.deleteClient)
router.put("/application/actualiserClient/:id", ClientControllers.actualiserClient)



module.exports = router; 