let express=require("express"); // step-1
let port=2202; // step-2

let app=express(); // step-3
app.set("view engine","ejs") // step-6
app.use(express.urlencoded({extended:true}));  // step-9

let students=[  // step-7
    {
        id:1,
        name:"jnavi",
        surname:"kaliya",
        subject:"Node.js"
    }
]
app.get("/",(req,res)=>{ // step-5
    res.render("index",{students});
})

app.post("/addData",(req,res)=>{ // step-8
    console.log(req.body);
    req.body.id=(students.length+1).toString();  // step-10
    students.push(req.body);
    res.redirect("/");
})

app.get("/editData/:id",(req,res)=>{ // step-12
    console.log(req.params.id);
    let singleData=students.find((el)=>el.id==req.params.id);
    res.render("edit",{singleData});
})

app.post("/updateData",(req,res)=>{ // step-13
    console.log(req.body.id);
    students.forEach((el)=>{
        if(el.id==req.body.id){
            el.name=req.body.name;
            el.surname=req.body.surname;
            el.subject=req.body.subject;
        }
    });
    res.redirect("/");
})
app.get("/deleteData",(req,res)=>{  // step-11
    console.log(req.query.id);
    students=students.filter((el)=>el.id!=req.query.id);
    res.redirect("/");
})
app.listen(port,(err)=>{ // step-4
    err?console.log(err):console.log(`Your server is created ${port}`)
})