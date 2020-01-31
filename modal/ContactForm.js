const mongoose = require("mongoose");

const ContactForm = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    message: {
        type: String
    }
})

module.exports = mongoose.model("ContactForm", ContactForm);