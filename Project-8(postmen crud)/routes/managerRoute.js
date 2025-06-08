const express = require("express")
const route = express.Router()
const ctl = require("../controller/managerCtl")
const auth = require("../middleware/auth")

route.post("/managerLogin", ctl.managerLogin);
route.get("/managerProfile", auth, ctl.managerProfile);
route.post("/changeManagerPassword",auth,ctl.changeManagerPassword)
route.post("/forgotManagerPassword",ctl.forgotManagerPassword)
route.put("/setManagerNewPass",ctl.setManagerNewPass)
route.post("/addEmployee", auth, ctl.addEmployee);
route.get("/viewEmployees", auth, ctl.viewEmployees); 

module.exports = route