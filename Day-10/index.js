const express=require("express") // step-1
const port=2505; // step-2

const app=express(); // step-3
const db=require("./config/db")// step-9
const schema=require("./model/schema") // step-10

app.set("view engine","ejs") // step-6
app.use(express.urlencoded({extended:true})) // step-7

app.get("/",async(req,res)=>{ // step-5
    await schema.find({}).then((student)=>{ // step-12
        res.render("index",{student})
    })
})

app.post("/addData",async(req,res)=>{ // step-8
    // console.log(req.body)
    // res.redirect("/")
    await schema.create(req.body).then(()=>{ // step-11
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{ // step-12
    // console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData",async(req,res)=>{ // step-13
    console.log(req.query.id)
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data})
    })
})

app.post("/updateData",async(req,res)=>{ // step-14
    await schema.findeByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})

app.listen(port,(err)=>{ // step-4
    err?console.log(err):console.log(`Your server is created ${port}`)
})