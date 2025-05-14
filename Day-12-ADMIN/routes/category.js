const express=require("express")
const route = express.Router()
const ctl = require("../controller/categoryCtl")
const passport = require("../middleware/passport")
// const multer = require("../middleware/multer")

route.get("/addCat",passport.checkAuth,ctl.addCat)
route.post("/addCat",passport.checkAuth,ctl.addCategory)

module.exports = route