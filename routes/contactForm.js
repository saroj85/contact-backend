const express = require("express");
const router = express.Router();
const ContactForm = require("../modal/ContactForm");
const { check, validationResult } = require('express-validator');
const transporter = require('../transporter');
const hbs = require('nodemailer-express-handlebars');

// @Route  POST/api/auth
// @Route  Auth user & get token
// @Route  Public

router.post('/', [
    check("email", "please enter valid email").isEmail()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {name, email, phone, message } = req.body;

    try {
       
        const Contact = new ContactForm({
            name: name,
            email:email,
            phone: phone,
            message: message
        })
    
        await Contact.save();
        // console.log("SAVE", Contact);
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
            to: "sarojkumar852131@gmail.com", // TODO: email receiver
            subject: 'Contact Form|| Test',
            text: 'Wooohooo it works!!',
            template: 'contact',
            context: {
                name: name,
                email: email,
                phone: phone,
                message: message
            } // send extra values to template
        };

        // Step 4
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) return console.log('Error occurs', err.message);
            return console.log('Email sent!!!', data);
        });
        
        res.status(200).send("sucess")
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")

    }
});


module.exports = router