const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssss', // TODO: your gmail account 
        pass: 'sar' // TODO: your gmail password
    }
});


module.exports = transporter;
