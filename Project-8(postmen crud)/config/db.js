const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/Project-8")

const db= mongoose.connection

db.once('open',(err)=>{
    err?console.log(err):console.log("db is connected")
})

module.exports = db;