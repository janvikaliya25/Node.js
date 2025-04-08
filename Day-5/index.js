let express=require("express");
let port=2205;

let app=express();

app.post("/",(req,res)=>{
    res.write("hello")
    res.end();
})

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port}`)
})
