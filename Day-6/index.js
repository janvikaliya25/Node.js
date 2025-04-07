// const { urlencoded } = require("body-parser");
let express=require("express")

let port=2505;

let app=express();
let db=require("./config/db")

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/addData",(req,res)=>{
    console.log(req.body)
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})