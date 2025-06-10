const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}) 

const firstSchema = mongoose.model("single",schema)

module.exports = firstSchema