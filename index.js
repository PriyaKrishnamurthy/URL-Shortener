//Back end for URL shortening
//eg: localhost:3000/url 
const express = require('express');
const app = express();

const PORT = 4000;
const { mongoose } = require('./config/db');
const {router} = require('./config/routes');
app.use(express.json());
app.use('/',router);

app.listen(PORT, ()=>{
    console.log('connected to Server');
})