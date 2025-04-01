let express=require("express");
let port=2522;

let app=express();

app.set("view engine", "ejs");

let students=[
    {
        id:1,
        name:"janvi",
        surname:"kaliya",
        subject:"Node.js"
    }
]
console.log(students)
app.get("/",(req,res)=>{
    res.render("index",{students});
    res.end();
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})