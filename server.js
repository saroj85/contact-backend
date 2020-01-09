const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");

app.listen(PORT, () => console.log(`server is running on ${PORT}`));


// connect  database
connectDB();

// init middleweare 
app.use(express.json({ extended: false }));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);