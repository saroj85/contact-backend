const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");
const product = require('./routes/products');
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 5000;

// connect  database


// init middleweare 
// app.use(express.json({ extended: false }));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/product', product);

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



connectDB();


app.listen(PORT, () => console.log(`server is running on ${PORT}`));