const validator  = require('validator');
const express  = require('express');

const validateUrl = function(req, res, next){
    
    let url = req.body.originalUrl;
    let urlValid = validator.isURL(url);
    if (urlValid){
        next();
    }else{
        res.send(' Not a valid url');
    }
}

module.exports = {
    validateUrl
}