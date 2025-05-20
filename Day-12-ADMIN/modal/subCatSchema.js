const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  subCatname: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true 
  }
}); 

const subCatSchema = mongoose.model("subCategories",subCategorySchema);
module.exports = subCatSchema;  