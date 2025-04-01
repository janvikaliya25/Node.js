let express=require("express");
let port=2205;

let app=express();

app.set("view engine","ejs")

let students=[
    {
        id:1,
        name:"Janvi",
        surname:"Kaliya",
        subject:"Node.js"
    }
]

app.get("/",(req,res)=>{
    res.render("index",{students});
    // res.end();
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})