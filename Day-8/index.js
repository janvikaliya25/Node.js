let express=require("express"); // 1
let port=2505; // 2

let app=express(); // 3
let db=require("./config/db") // 9
let schema=require("./model/schema") // 10
let multer=require("./middleware/multer") // 17
let path=require("path"); // 19
const upload = require("./middleware/multer"); // 18

app.set("view engine","ejs") // 6
app.use(express.urlencoded({extended:true})) // 7
app.use("/uploads",express.static(path.join(__dirname,"uploads"))) // 20

app.get("/",async(req,res)=>{ // 5
    // console.log(book)
    await schema.find({}).then((book)=>{ // 12
        res.render("index",{book})
    })
})

app.post("/addbook",multer,async(req,res)=>{ // 8
    // await schema.create(req.body).then(()=>{ // 13
    //     res.redirect("/")
    // })
    // console.log(req.file)
    req.body.image=req.file.path // 16
    await schema.create(req.body).then(()=>{
        res.redirect("/")
    })
    // console.log(req.body)
})

app.get("/addbook",(req,res)=>{ // 11
    res.render("addbook")
})

app.get("/deleteData",async(req,res)=>{ // 14
    console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id,).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData",async(req,res)=>{ // 15
    console.log(req.query.id)
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data})
    })
})

app.post("/updateData",async(req,res)=>{ // 16
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})

app.listen(port,(err)=>{ // 4
    err?console.log(err):console.log(`Your server is created ${port} ...`)
})