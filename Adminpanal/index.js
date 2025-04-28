const express=require("express");

const port=2505;
const db=require("./config/db")
const path=require("path")

const app=express();

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))


app.get("/",(req,res)=>{
    res.render("Dashboard")
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})
