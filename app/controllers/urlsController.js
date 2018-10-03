const express =  require('express');
const router = express.Router();
const {Url}  = require('../models/url');
const {validateId} = require('../middlewares/utilities');

//Return all urls that match all the specified tags
//get, localhost:4000/urls/tags?name=tag1,tag2
router.get('/tags', (req, res)=>{
  let query = req.query;
  let tags = query['names'].split(',');
  console.log(tags);
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


//localhost:4000/urls
//gets all the urls stored
router.get('/',(req, res)=>{
    console.log(req);
    res.send('recieved a request');
});

//localhost:4000/urls/:id
//retrieve the url with the given id
router.get('/:id', validateId, (req, res)=>{
    let id = req.params.id;
    Url.findById(id).then((url)=>{
        res.send(url);
    }).catch((err)=>{
        res.send({
            notice: 'Id not found'
        });
    })
})

//create a new url, post, localhost:4000/urls
router.post('/', function(req, res){
    let currentUrl = new Url(req.body);
    currentUrl.save().then((url)=>{
        url.generateToken().then((token)=>{
            res.header('x-auth', token).send(url);
        })
        .catch((err)=>{
            res.send('this is error1, '+err);
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
})
//Delete a url, localhost:4000/urls/:id
router.delete('/:id',validateId, (req, res)=>{
    let id = req.params.id;
    Url.deleteOne( {
        _id: id
    }).then((url)=>{
        res.send({
            notice: 'deleted Successfully'
        })
    }).catch((err)=>{
        res.send(err);
    })
})

//update a particular url, put, localhost:4000/urls/:id
//Replaces complete/all fields of the url object with given id
router.put('/:id', validateId, (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    Url.findOneAndUpdate({_id: id}, { $set: body}, {upsert: true, setDefaultsOnInsert: true, new: true, runValidators: true})
    .then((url)=>{
         res.send({
            notice: 'Successfully updated',
            url
        })
    })
} )

//update a part of the url object with given data
router.patch('/:id', validateId, (req, res)=>{
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

//Return all urls that match the specified tag
// get, localhost:4000/urls/tags/:name
router.get('/tags/:name', (req, res)=>{
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



module.exports = {
    urlsController: router
}