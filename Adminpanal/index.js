const express=require("express");
const port=2505;
const path=require("path")
const app=express();
const db=require("./config/db")
const cookieParser = require('cookie-parser')

app.set("view engine","ejs")

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())


app.use("/",require("./Routes/route"))


app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})
