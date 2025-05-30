const express = require("express")
const route=express.Router()
const ctl=require("../controller/Ctl")

route.post("/register",ctl.register)

module.exports = route