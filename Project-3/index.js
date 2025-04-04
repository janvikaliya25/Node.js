let express=require("express"); // step-1
let port=2502;// step-2
let path = require("path") // step-8

let app=express(); // step-3
app.set("view engine","ejs"); // step-6
app.use(express.static(path.join(__dirname,"public"))) // step-7

app.get("/",(req,res)=>{ // step-5
    res.render("index");
    // res.end();
})

app.get("/about",(req,res)=>{ // step-9
    res.render("about")
})

app.get("/services",(req,res)=>{ // step-9
    res.render("services")
})

app.get("/portfolio",(req,res)=>{ // step-9
    res.render("portfolio")
})

app.get("/team",(req,res)=>{ // step-9
    res.render("team")
})

app.get("/pricing",(req,res)=>{ // step-9
    res.render("pricing")
})

app.get("/blog",(req,res)=>{ // step-9
    res.render("blog")
})

app.get("/contact",(req,res)=>{ // step-9
    res.render("contact")
})

app.listen(port,(err)=>{ // step-4
    err?console.log(err):console.log(`Your server is created ${port}`)
})