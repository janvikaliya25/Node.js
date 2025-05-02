const express = require("express")
const route = express.Router()
const ctl = require("../Controller/ctl")


route.get("/",ctl.homepage)
route.post("/addData",ctl.addData)
route.get("/delete",ctl.delete)
route.get("/edit",ctl.edit)
route.post("/update",ctl.update)
module.exports = route 