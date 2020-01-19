const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please enter your valid ']
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isVarifiedUser: {
        require: true,
        type: Boolean,
        default: false
       
    },
    

})

module.exports = mongoose.model("User", UserSchema);