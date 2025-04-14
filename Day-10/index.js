const express=require("express") // step-1
const port=2505; // step-2

const app=express(); // step-3
const db=require("./config/db")// step-9

app.set("view engine","ejs") // step-6
app.use(express.urlencoded({extended:true})) // step-7

app.get("/",(req,res)=>{ // step-5
    res.render("index")
})

app.post("/addData",(req,res)=>{ // step-8
    console.log(req.body)
    res.redirect("/")
})

app.listen(port,(err)=>{ // step-4
    err?console.log(err):console.log(`Your server is created ${port}`)
})