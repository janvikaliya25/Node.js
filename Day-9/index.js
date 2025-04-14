
let express=require("express") // 1

let port=2505; // 2

let app=express(); // 3
let db=require("./config/db") // 9
let schema=require("./model/firstSchema");  //10
const multer=require("./middleware/multer") // 15
const path=require("path") // 16

app.set("view engine","ejs"); // 6
app.use(express.urlencoded({extended:true})); // 7
app.use("/uploads",express.static(path.join(__dirname,"uploads"))) // 18

// app.get("/",async(req,res)=>{ // 5
//     // let Student= await schema.find({}) // 12
//     // console.log(Student);
//     // res.render("index",{Student})

//     await schema.find({}).then((Student)=>{ // second method
//         res.redirect("index",{Student})
//     })
// })
app.get("/", async (req, res) => {
    await schema.find({}).then((Student) => {
        res.render("index", { Student }) // ✅ Corrected from res.redirect to res.render
    })
})

 
app.post("/addData",multer,async(req,res)=>{ // 8
    // let data= await schema.create(req.body); // 11
    // data && res.redirect("/")

    // await schema.create(req.body).then(()=>{ // second method
    //     res.redirect("/")
    // })
    req.body.image=req.file.path
    await schema.create(req.body).
     then(()=>{
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{ // 12
    console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData",async(req,res)=>{ // 13
    console.log(req.query.id)
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data})
    })
})

app.post("/updateData",async(req,res)=>{ // 14
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})

app.listen(port,(err)=>{ // 4
    err?console.log(err):console.log(`Your server is created ${port}`)
})