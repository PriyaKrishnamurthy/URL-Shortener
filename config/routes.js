const express = require('express');
const router = express.Router();
const {urlsController} = require('../app/controllers/urlsController');


router.use('/urls',urlsController);
module.exports = {
    router
}