const express = require("express")
const {} = require("../controllers/users.js")
const router = express.Router()

router.post("/signin",signin)
router.post("/signup",signup)




module.exports   = router