const express = require("express")
const route = express.Router()
const ctl = require("../controller/Ctl")

route.post("/registerAdmin",ctl.registerAdmin)
module.exports = route