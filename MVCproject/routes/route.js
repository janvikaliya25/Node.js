const express =  require("express");

const route = express.Router()
const ctl = require("../controller/ctl")

route.get("/",ctl.firstpage)
route.post("/addData",ctl.add)

module.exports = route;