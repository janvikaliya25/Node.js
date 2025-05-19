const mongoose = require("mongoose");
const { addSubCategory } = require("../controller/subCategoryCtl");

const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true,    
    },
    productPrice: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    SubCategoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subCategories',
            required: true
    }
});

const ProSchema = mongoose.model("product",schema);
module.exports = ProSchema;  