const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'web4satyendra@gmail.com', // TODO: your gmail account 
        pass: 'Saroj@852131' // TODO: your gmail password
    }
});


module.exports = transporter;