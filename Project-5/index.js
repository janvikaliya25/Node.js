const express = require("express")
const port = 2005
const app = express()
const db = require("./Config/db")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.use("/",require("./Routes/route"))


 
app.listen(port,(err)=>{
    err ? console.log("err" +err) : console.log("your server is created on the port " +port)
})