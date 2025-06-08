
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,  
    unique: true     
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true   
  },
  image: {
    type: String   
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    required: true   
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const firstSchema = mongoose.model("admin", schema); 

module.exports = firstSchema