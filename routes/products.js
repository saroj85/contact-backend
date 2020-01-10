const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../modal/Products");
const { check, validationResult } = require('express-validator');

// @Route  GET/product
// @desc   GET All Products 
// @Access PUBLIC
router.get('/' , async (req, res) => {
    try {
        const Product = await Product.find();
        res.json(Product)

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" })

    }
});


// router.get('/', (req, res, next) => {
//     Post.find((err, posts) => {
//         if (err) return next(err)
//         res.json(posts)
//     })
// })
 


// @Route  POST/Product
// @desc   POST Add Product 
// @Access Private

router.post('/', auth, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { name, decription, specifation, ratings , price, images, avalibale, catagory} = req.body;
    try {
        const newProduct = new Contact({
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



// @Route  PUT/Product
// @desc   Update Product
// @Access Private

router.put('/:id', (req, res) => {
    console.log(req)
    Contact.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return err;
        res.send('Product Update successfully!');
    })
});




// @Route  DELETE/contacts
// @desc   DELETE Contacts
// @Access Private

router.delete('/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err) => {
        if (err) return err;
        res.send('Deleted successfully!');
    })
});

module.exports = router