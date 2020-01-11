const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    decription: {
        type: String,
    },
    specifation : {
        type: Object

    },
    ratings: {
        type: String
    },
    price: {
        type: Object
    },
    images: {
        type: Array
    },
    avalibale: {
        type:Boolean
    },
    catagory: {
        type: String
    }

    
})

module.exports = mongoose.model("Product", ProductSchema);