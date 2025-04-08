const mongoose=require("mongoose"); // step-1

mongoose.connect("mongodb.127.0.0.1.NodejsCRUD") // step-2

const db=mongoose.connection; // step-3

db.once("open",(err)=>{ // step-4
    err?console.log(err):console.log(`Database Connected...!`)
})

module.exports=db // step-5