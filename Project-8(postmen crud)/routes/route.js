const express = require("express")
const route = express.Router()
const ctl = require("../controller/Ctl")

route.post("/registerAdmin",ctl.registerAdmin)
route.post("/adminLogin",ctl.adminLogin)
route.get("/adminProfile", ctl.adminProfile);

module.exports = route