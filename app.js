// Import Required Modules
const express = require('express');
const nunjucks = require('nunjucks');
//const feather = require('feather');
//const fs = require(fs);
const app = express();

// Declare the port
const port = 3000;

// Get nunjucks going
nunjucks.configure('templates', {
   autoescape: true,
   noCache: true,
   express: app
});

// Routes
app.get('/', (req, res) => {
   res.render('index.njk');
});

// Public Folder
app.use(express.static('public', {index: false}));

app.listen(port);
