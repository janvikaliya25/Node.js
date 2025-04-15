
let express=require("express") // 1

let port=2505; // 2

let app=express(); // 3
let db=require("./config/db") // 9
let schema=require("./model/firstSchema");  //10
const multer=require("./middleware/multer") // 15
const path=require("path") // 16
const fs=require("fs") // 19

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
app.get("/", async (req, res) => { // 17,5
    await schema.find({}).then((Student) => {
        res.render("index", { Student }) 
    })
})

 
app.post("/addData",multer,async(req,res)=>{ // 8
    // await schema.create(req.body).then(()=>{ // second method // 11
    //     res.redirect("/")
    // })

    req.body.image=req.file.path // 17
    await schema.create(req.body).
     then(()=>{
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{ // 12
    let singleData=await schema.findById(req.query.id); // 20
    fs.unlinkSync(singleData.image)
    // console.log(req.query.id)
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

app.post("/updateData",multer,async(req,res)=>{ // 14
    // console.log(req.body)
    // console.log(req.file)

    let singleData=await schema.findById(req.body.id); // 21
    let img="";

    req.file ? img=req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)

    req.body.image=img

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{ // 14
        res.redirect("/")
    })
})

app.listen(port,(err)=>{ // 4
    err?console.log(err):console.log(`Your server is created ${port}`)
})