require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const layout = require('express-ejs-layouts');

const routes = require("./routes/routes");

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