const express = require("express")
const route=express.Router()
const ctl=require("../controller/Ctl")
// const multer = require("../middleware/multer")

route.post("/addData",ctl.addData)
route.get("/showData",ctl.showData)
route.delete("/deleteData",ctl.deleteData)
route.put("/updateData",ctl.updateData)

module.exports = route