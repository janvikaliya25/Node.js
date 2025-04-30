const mongoose = require("mongoose")
const schema = mongoose.Schema({
    urls :{
        type :String,
        required : true
    },
    title :{
        type :String,
        required : true
    },
    price :{
        type :String,
        required : true
    }
   
})

const fschema = mongoose.model("movie",schema)

module.exports = fschema