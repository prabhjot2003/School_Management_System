const express = require('express')
const app = express();
require("dotenv").config();
const mongoose = require('mongoose')
const my_routes = require("./src/routes/index")
const jwt = require('jsonwebtoken');

app.use(express.json());


const bodyParser = require("body-parser");
app.use(bodyParser.json());



// mongodb Connection

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("connected to db")
    }).catch((error) => {
        console.log(error);
    });


// routing
app.use('/', my_routes)

// create the Port number
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});