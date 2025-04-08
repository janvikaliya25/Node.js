const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})

const firstSchema=mongoose.model("Student",schema);

module.exports=firstSchema;