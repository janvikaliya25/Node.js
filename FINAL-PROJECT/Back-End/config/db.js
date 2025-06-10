
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1/FINAL-PROJECT")

// const db=mongoose.connection

// db.once('open',(err)=>{
//     err?console.log(err):console.log(`Your Database is connected`)
// })

mongoose.connect("mongodb+srv://janvi12:janvi12@cluster0.6jomope.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Db conected")
})

// module.exports=db; 
module.exports=mongoose