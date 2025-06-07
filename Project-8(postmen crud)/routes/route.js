const express = require("express")
const route = express.Router()
const ctl = require("../controller/Ctl")
const auth = require("../middleware/auth")

route.post("/registerAdmin",ctl.registerAdmin)
route.post("/adminLogin",ctl.adminLogin)
route.get("/adminProfile",auth,ctl.adminProfile);
route.post("/changePassword",auth,ctl.changePassword)
route.post("/forgotPassword",ctl.forgotPassword)
route.post("/setNewPass",ctl.setNewPass)

module.exports = route