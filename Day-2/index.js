const express=require("express");  //step-1
const port=2506; // step-2

const app=express();  // step-3

app.set("view engine","ejs")  // step-6

let students=[  // step-7
    {id:1,name:"janvi",subject:"Node.js"}
]

app.get("/",(req,res)=>{  // step-5
    res.render("index",{students})
    res.end();
})


app.listen(port,(err)=>{  // step-4
    err?console.log(err):console.log(`server is create ${port}`);
})