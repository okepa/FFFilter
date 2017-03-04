require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const layout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const routes = require("./routes/routes");

mongoose.connect('mongodb://127.0.0.1/fanfictions');

//View Engine
app.set('view engine' , 'ejs');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(layout);
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});