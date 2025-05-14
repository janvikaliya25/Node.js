const express = require('express');
const path = require('path');
const port = 2505;

const app = express();
const db = require("./config/db");
const cookie = require("cookie-parser")
const session=require("express-session");
const passport=require("passport");
const connectFlash=require("connect-flash");
const flash=require("./middleware/flash")

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use(cookie());
app.use(session({
    name:"local",
    secret: 'SEO',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge:100*100*60}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(connectFlash())
app.use(flash.setFlash)

app.use("/",require('./routes/route'));
app.use("/category",require("./routes/category"))

app.listen(port , (err)=>
err ? console.log(err) : console.log(`Your server is created ${port}`)
) 