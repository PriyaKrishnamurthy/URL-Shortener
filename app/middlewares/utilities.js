const mongoose = require('mongoose');
const express = require('express');

const validateId = function(req, res, next){
    let id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)){
        next();
    }else{
        res.send('Invalid Object ID');
    }
}
module.exports = {
    validateId
}