const mongoose = require('mongoose');
const express = require('express');
const useragent = require('express-useragent');

const validateId = function(req, res, next){
    let id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)){
        next();
    }else{
        res.send('Invalid Object ID');
    }
}
const createClick = function(req, res, next){
    let agentDetails = req.useragent;
    let click = {};
    click['clickedDateTime'] = Date.now();
    click['ipAddress'] = req.connection.remoteAddress;
    click['browserName'] = agentDetails.browser;
    click['OSType'] = agentDetails.os;
    if (agentDetails.isiPhone){
        click['deviceType'] = 'iPhone';
    }else if(agentDetails.isDesktop){
        click['deviceType'] = 'Desktop';
    }else{
        click['deviceType'] = 'Unknown';
    }
    return click;
}

module.exports = {
    validateId,
    createClick
}