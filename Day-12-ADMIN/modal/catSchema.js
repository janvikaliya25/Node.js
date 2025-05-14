const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image:{
        type : String,
        required : true,    
    },
    catname : {
        type : String,
        required : true
    }
});

const catSchema = mongoose.model("categories",schema);
module.exports = catSchema;