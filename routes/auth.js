const express = require("express");
const router = express.Router();
const User = require("../modal/Users");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
// @Route  GET/api/auth
// @Route  auth user loggiden
// @Route  Private
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")   
    }
});


// @Route  POST/api/auth
// @Route  Auth user & get token
// @Route  Public
router.post('/', [
    check("email", "please enter valid email").isEmail(),
    check("password", "please enter password or 6 degits").exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({msg: "invalid user"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg: "invalid password"})
        }
        const payload = {
            user : {
                id: user.id
            }
        }

        Jwt.sign(payload, config.get("jwtSecret"), {expiresIn : 36000}, (err, token) => {
            if(err) throw err;
            res.json({token})
        })        

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
});


module.exports = router