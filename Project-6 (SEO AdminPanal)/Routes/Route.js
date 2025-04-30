const express=require("express")

const route=express.Router();
const ctl=require("../controller/ctl");

route.get("/",ctl.dashboard);
route.get("/ragisterAdmin",ctl.ragisterAdmin);
route.get("/viewAdmin",ctl.viewAdmin);

module.exports=route;