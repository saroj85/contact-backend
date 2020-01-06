const express = require("express");
const router = express.Router();
const User = require("../modal/Users");
const auth = require("../middleware/auth");
const Contact = require("../modal/Contacts");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');


// @Route  GET/users
// @desc   GET All contacts 
// @Access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({msg: "Server Error"})
        
    }
});


// @Route  POST/users
// @desc   POST Add Contacts 
// @Access Private

router.post('/', auth, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const {name , email , phone, type} = req.body;
    try {
        const newContact = new Contact({
            name: name,
            email : email,
            phone: phone,
            type: type,
            user: req.user.id
        })

        const contact =  await newContact.save();
        res.json(contact);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({msg: "server Errro"});
        
    }
});



// @Route  PUT/contacts
// @desc   Update Contacts
// @Access Private


router.put('/:id', (req, res) => {
    res.send("Update Contact")
});




// @Route  DELETE/contacts
// @desc   DELETE Contacts
// @Access Private

router.delete('/:id', (req, res) => {
    res.send("Delete Contact")
});

module.exports = router