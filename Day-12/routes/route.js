const express = require('express');
const multer = require('../middleware/multer');

const route = express.Router();
const ctl = require('../controller/ctl');
// const passport = require('passport');
const passport=require("../middleware/passport")

route.get("/",ctl.login)
route.post("/login",passport.authenticate("local",{failureRedirect:"/"}),ctl.loginadmin);
route.get("/logout",ctl.logout);
route.get('/dashboard',passport.checkAuth, ctl.dashboard);
route.get('/addAdmin', ctl.addAdmin);

route.get('/table', ctl.viewAdmin);
route.post('/addrecord',multer, ctl.add);
route.get("/deldata",ctl.delete);
route.get("/editdata",ctl.edit);
route.post("/updaterec",multer,ctl.update);

module.exports = route;