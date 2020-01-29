const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../modal/Products");
const { check, validationResult } = require('express-validator');



// @Route  POST/Product
// @desc   POST Add Product 
// @Access Private

router.post('/', async (req, res) => {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ error: error.array() });
    // }
    const { name, decription, specifation, ratings , price, images, avalibale, catagory} = req.body;
    try {
        const newProduct = new Product({
           name: name,
           decription: decription,
           specifation: specifation,
           ratings: ratings,
           price: price,
           images: images,
           avalibale: avalibale,
           catagory: catagory
        })

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "server Errro" });
    }
});




// @Route  GET/product
// @desc   GET All Products 
// @Access PUBLIC
router.get('/' , async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" })

    }
});



// @Route  GET/product
// @desc   GET All Products 
// @Access PUBLIC
router.get('/' , async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product)

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" })

    }
});


// @Route  PUT/Product
// @desc   Update Product
// @Access Private

router.put('/:id', (req, res) => {
    console.log(req)
    Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return err;
        res.send('Product Update successfully!');
    })
});




// @Route  DELETE/Product
// @desc   DELETE Product
// @Access Private

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return err;
        res.send('Product Deleted successfully!');
    })
});




module.exports = router