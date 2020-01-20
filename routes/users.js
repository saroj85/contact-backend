const express = require("express");
const router = express.Router();
const User = require("../modal/Users");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');
const Otp = require("../modal/Otp");
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const hbs = require('nodemailer-express-handlebars');
const transporter = require('../transporter');



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
            password: password
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



// create otp 
router.post('/otp', async (req, res) => {

    try {
        const email = req.body.email
        const user = await User.findOne({ email: email }).select("_")

        const otp = new Otp({
            user: user._id,
            otpNum: Math.floor(100000 + Math.random() * 900000),
            expire: false,
            email: user.email
        })

        await otp.save()
    
    // going to send email otp 

        const handlebarOptions = {
            viewEngine: {
              extName: '.hbs',
              partialsDir: 'emails',
              layoutsDir: 'emails',
              defaultLayout: '',
            },
            viewPath: 'emails',
            extName: '.hbs',
          };
        transporter.use("compile",hbs(handlebarOptions));


        // Step 3
        let mailOptions = {
            from: 'send4saroj@gmail.com', // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'Verify Otp || Test',
            text: 'Wooohooo it works!!',
            template: 'index',
            context: {
                name: user.name && user.email || "user",
                otp: otp.otpNum,
                date : Date.now()
            } // send extra values to template
        };

        // Step 4
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) return console.log('Error occurs', err.message);
            return console.log('Email sent!!!', data);
        });
        
        res.json({msg : "otp sent sucessfull"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});



// verify otp 
router.post('/otpverify', async (req, res) => {
    const otpnum = req.body.otpNum;
    try {
        const otpfind = await Otp.findOne({ otpNum: otpnum }).select("-otp");
        if (!otpfind) return res.status(400).json({ msg: "otp not match" });
        // going to find user  by user id
        const user_Id = otpfind.user
        // const user = await User.find({_id: `${user_Id}`});
        User.findOne({ _id: user_Id }, function (err, doc) {
            doc.isVarifiedUser = true;
            doc.save();
        });
        res.send("Otp v sucessfull")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }

});


module.exports = router;
