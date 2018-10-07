const express = require('express');
const router = express.Router();

const errorHandler = function(err, req, res, next){
    console.log('i am in');
    res.sendStatus(404);
    res.render('error', {error: err});
};
module.exports = {
    errorHandler
}