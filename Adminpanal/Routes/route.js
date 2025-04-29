const express=require("express");

const route=express.Router()
const ctl=require("../controller/ctl")

// route.get("/",ctl.login)
// route.post("/loginpage",ctl.loginpage)
// route.get("/indexpage",ctl.indexpage)
// route.post("/addAdmin",ctl.addAdmin)
route.get("/",ctl.dashboard)
route.get("/addadmin",ctl.addadmin)
route.get("/viewadmin",ctl.viewadmin)
route.post("/addData",ctl.addData)
route.get("/delete",ctl.delete)
route.get("/edit",ctl.edit)
route.post("/update",ctl.update)
module.exports=route; 