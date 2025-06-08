const express = require("express")
const route = express.Router()
const ctl = require("../controller/Ctl")
const auth = require("../middleware/auth")

route.post("/registerAdmin",ctl.registerAdmin)
route.post("/adminLogin",ctl.adminLogin)
route.get("/adminProfile",auth,ctl.adminProfile);
route.post("/changePassword",auth,ctl.changePassword)
route.post("/forgotPassword",ctl.forgotPassword)
route.put("/setNewPass",ctl.setNewPass)
route.post("/addManager", auth, ctl.addManager);
route.get("/getAllManagers", auth, ctl.getAllManagers);
route.put("/admin/manager/deleteManager/:id",auth,ctl.deleteManager)
route.get("/viewAllEmployee", auth, ctl.viewAllEmployee);
route.put("/admin/manager/employee/deleteEmployee/:id",auth,ctl.deleteEmployee)

module.exports = route