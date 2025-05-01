const express=require("express")

const route=express.Router();
const ctl=require("../controller/ctl");

route.get("/",ctl.dashboard);
route.get("/registerAdmin", ctl.registerAdmin);
route.get("/viewAdmin",ctl.viewAdmin);
route.post("/addAdmin",ctl.addAdmin);
route.get("/delete",ctl.delete);
route.get("/edit",ctl.edit);
route.post("/update",ctl.update);

module.exports=route;