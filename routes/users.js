const express = require("express");
const router = express.Router();
const User = require("../modal/Users");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');


// @Route  POST/users
// @Route  POST/register
// @Route  users

router.post('/', [
    check("name", "name is required").not().isEmpty(),
    check("email", "please enter valid email ").isEmail(),
    check("password", "please enter a password or 6 digits charaters").isLength({ min: 6 })

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ msg: "user already exitis" });
        }

        user = new User({
            name: name,
            email: email,
            password: password,
            otp:Math.floor(100000 + Math.random() * 900000),
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };

        Jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    };
});


module.exports = router;