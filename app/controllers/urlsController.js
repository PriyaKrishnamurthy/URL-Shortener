const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Url} = require('../models/url');
const {validateId} = require('../middlewares/utilities');

//Return all urls that match the specified tag
// get, localhost:4000/urls/tags/:name
router.get('/tags/:name', (req, res)=>{
    console.log('in tags/name');
    let name = req.params.name;
    Url.find({ tags: name}).then((urls)=>{
        if(urls){
            res.send(urls);
        }else{
            res.send({
                notice: 'no URLs found'
            })
        }
    })
    .catch((err)=>{
        res.send(err);
    })
})

//Return all urls that match all the specified tags
//get, localhost:4000/urls/tags?name=tag1,tag2
router.get('/tags', (req, res)=>{
    console.log('in tags');
    let query = req.query;
    let tags = query['names'].split(',');
    Url.find({ tags: {$in : tags}}).then((urls)=>{
        if (urls){
            res.send(urls);
        }else{
            res.send({
                notice: 'No URL found with tag'
            })
        }
    })
  });

//Retrieve a url with its id
//get,localhost:5000/urls/:id
router.get('/:id',validateId, (req, res)=>{
    console.log('in /id');
    let id = req.params.id;
    Url.findById( id ).then((url)=>{
        res.send(url);
    })
})
//Create an url 
//post, localhost:5000/urls/
router.post('/', (req, res)=>{
    let body = req.body;
    let url = new Url(body);
    url.save().then((url)=>{
        console.log('url data is saved');
        res.send(url);
    })
    .catch((err)=>{
        res.send(err);
    })
})

//delete a given url by its ID
//delete, localhost:5000/urls/:id
router.delete('/:id', validateId, (req, res)=>{
    let id = req.params.id;
   // Url.deleteOne( {id: id}).then((url, )=>{})
    Url.findByIdAndDelete(id).then((url)=>res.send(url))
    .catch((err)=>res.send(err))
})

//update properties of a url by its ID
//Replaces complete/all fields of the url object with given id
//put, localhost:5000/urls/:id
router.put('/:id', validateId, (req, res)=>{
    let id = req.params.id;
    let body = req.body;
    Url.findOneAndUpdate({_id: id}, {$set: body}, {upsert: true,setDefaultsOnInsert: true, new: true, runValidators: true})
    .then((url)=>{
        res.send({
            notice: 'updated/created successfully',
            url});
    })
})

//update a part of the url object with given data
router.patch('/', (req, res)=>{
    let id = req.params.id;
    let body = req.body;
    Url.findOneAndUpdate({_id: id}, { $set: body},{ new: true, runValidators: true})
    .then((url)=>{
        if(url){
            res.send({
                notice: 'Successfully updated',
                url
            })
        }else{
            res.send({
                notice: 'URL not found'
            })
        }
    })
})

//List all urls from database
//get localhost:5000/urls/
router.get('/', (req, res)=>{
    console.log('i am here');
    Url.find().then((urls)=>{
        res.send(urls);
    })
    .catch((err)=>{res.send(err)})
})
//app.use(errorHandler);
/*router.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(404).send('Something broke!');
    next(err);
  })
*/
module.exports = {
    urlsController: router
}