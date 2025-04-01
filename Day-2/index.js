let express=require("express");  // step-1
let port=2506; // step -2

let app=express();  // step-3

app.set("view engine","ejs");  // step-6
app.use(express.urlencoded({extended:true}));  // step-9

let students=[   // step-7
    {
        id:1,
        name:"janvi",
        surname:"kaliya",
        subject:"Node.js",
        course:"Full-Stack Development"
    }
]
app.get("/",(req,res)=>{  // step-5  
    res.render("index",{students});
    res.end();
})

app.post("/addData",(req,res)=>{  // step-8
    // console.log(req.body)
    // req.body.id=students.length+1  // step-10
    students.push(req.body)
    res.redirect("/")   // redirect in students variable
})

// app.post("/deleteData",(req,res)=>{  // step-11
//     let newData=students.filter((item)=>item.id!=req.query.id)
//     students=newData
//     res.redirect("/")
// })

app.listen(port,(err)=>{  // step-4
    err?console.log(err):console.log(`your server is created ${port}`);
})