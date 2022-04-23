//Require
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require("fs");
const path = require('path');

//initialize app
const app = express();

//set port
const PORT = process.env.PORT || 80;

//data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//static files
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Listener
app.listen(PORT, () => {
    console.log(`App is now listening on PORT: ${PORT}`)
});