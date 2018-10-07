const express = require('express');
const router  = express.Router();
const {urlsController} = require('../app/controllers/urlsController');
const {Url} = require('../app/models/url');
const {errorHandler} = require('../app/middlewares/error-handler');
const {createClick} = require('../app/middlewares/utilities');


//Declare this before the next handler , general url
//get: localhost:5000/urls
router.use('/urls', urlsController);

//declare this before the above, else this takes priority compared to the above
//localhost:5000/urls will be considered localhost:5000/:hash
//get: localhost:5000/:hash
router.get('/:hash', (req, res)=>{
    let hash = req.params.hash;
    let clickData = createClick(req, res);
    Url.findOneAndUpdate({ hashedUrl: hash }, {$push: {clicks: clickData}})
    .then((url)=>{
        res.redirect(url.originalUrl);
    })
    .catch((err)=>res.send(err))
})


//app.use(errorHandler);
/*router.use(function(req, res, next) {
    res.status(404).send('The resource you are looking for doesn’t exist.');
    next();
});*/

module.exports = {
    routes: router
}