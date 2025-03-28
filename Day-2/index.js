let express=require("express");  // step-1
let port=2506; // step -2

let app=express();  // step-3

app.set("view engine","ejs");  // step-6

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

app.listen(port,(err)=>{  // step-4
    err?console.log(err):console.log(`your server is created ${port}`);
})