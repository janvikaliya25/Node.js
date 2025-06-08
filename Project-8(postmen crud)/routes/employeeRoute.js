const express = require("express")
const route = express.Router()
const ctl = require("../controller/employeeCtl")
const auth = require("../middleware/auth")

route.post("/employeeLogin",ctl.employeeLogin)
route.get("/employeeProfile", auth, ctl.employeeProfile);
route.post("/changeEmployeePassword",auth,ctl.changeEmployeePassword) 
route.post("/forgotEmployeePassword",ctl.forgotEmployeePassword)
route.put("/setEmployeeNewPass",ctl.setEmployeeNewPass)

module.exports = route