const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");
const product = require('./routes/products');
const contactForm = require("./routes/contactForm");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 5000;

// connect  database
connectDB();

// init middleweare  for post request 
app.use(express.json({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/product', product);
app.use('/api/contactfrom', contactForm);


app.get('/', (req, res) => {
   try {
    // res.status(200).send("Hello The is node js Api");
    fs.readFile("index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
   } catch (err) {
       res.status(400).send(err.message)
   }
})






app.listen(PORT, () => console.log(`server is running on ${PORT}`));
