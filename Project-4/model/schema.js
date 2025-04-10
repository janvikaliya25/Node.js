const mongoose = require("mongoose")

const schema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

const firstschema = mongoose.model("book", schema);

module.exports = firstschema;