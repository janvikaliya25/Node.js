const express = require("express")
const route = express.Router()
const ctl = require("../controller/subCategoryCtl")
const passport = require("../middleware/passport")
// const multer = require("../middleware/multer2")

route.get("/addSubCategory", passport.checkAuth, ctl.addSubCategory)
route.post("/addSubCategory", passport.checkAuth, ctl.addSubCat)
route.get("/viewSubCat",passport.checkAuth,ctl.viewSubCategory)

module.exports = route   