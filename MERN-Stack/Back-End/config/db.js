
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/MERN-Stack")

const db=mongoose.connection

db.once('open',(err)=>{
    err?console.log(err):console.log(`Your Database is connected`)
})

module.exports=db;