const express=require("express")
const route = express.Router()
const ctl = require("../controller/productCtl")
const passport = require("../middleware/passport")
const multer = require("../middleware/multer2")

route.get("/addPro",passport.checkAuth,ctl.addPro)
route.post('/addProduct', passport.checkAuth,multer.single('image'),  ctl.addProduct);
route.get("/viewProduct",passport.checkAuth,ctl.viewProduct)

module.exports = route