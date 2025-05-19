const express=require("express")
const route = express.Router()
const ctl = require("../controller/categoryCtl")
const passport = require("../middleware/passport")
const multer = require("../middleware/multer2")

route.get("/addCat",passport.checkAuth,ctl.addCat)
// route.post("/addCat",passport.checkAuth,ctl.addCategory)
// route.post('/addCat', multer,ctl.addCategory);
route.post('/addCat', multer.single('image'), passport.checkAuth, ctl.addCategory);
route.get("/viewCat",passport.checkAuth,ctl.viewCat)

module.exports = route   