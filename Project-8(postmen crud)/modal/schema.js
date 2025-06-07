const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
})

const firstSchema = mongoose.model("admin", schema)

module.exports = firstSchema