const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    otpNum: {
        type: Number,
    },
    isExpire : {
        type: Boolean
    },
   
    email: {
        type: String
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("otp", OtpSchema);