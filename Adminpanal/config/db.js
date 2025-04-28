const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1/AdminpanalCrud")

const db=mongoose.connection;

db.once("open",(err)=>{
    err?console.log(err):console.log("Your Data base is connectes...!");
})

module.exports=db;
