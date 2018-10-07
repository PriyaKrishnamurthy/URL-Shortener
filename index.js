const express = require('express');
const app = express();

//Packgaes needed for logging the http details
const morgan = require('morgan');
const fs  = require('fs');

//packages for database, useragent details
const {mongoose}= require('./config/db');
const useragent = require('express-useragent');
const {routes} = require('./config/routes');
const PORT = process.env.PORT || 5000;

//to read the body of the request
app.use(express.json());
//to enable usage of useragent package
app.use(useragent.express());

//Open a file in append mode to be given as second parameter for morgan package, to log the http details
let accessLogStream = fs.createWriteStream((`${__dirname}/logs/access.log`), {flags: 'a' })
app.use(morgan('combined', {stream: accessLogStream}));

//Any request on port 5000, is forwarded to routes.js 
app.use('/', routes);

//Error handler to deal with an incorrect path 
//localhost:5000/get/url
//must be declared at end, after routing the correct routes
app.use(function(req, res, next) {
    res.status(404).send('The resource you are looking for doesn’t exist.');
    next();
});


app.listen(PORT, ()=>{
    console.log('Listening on port', PORT);
})

