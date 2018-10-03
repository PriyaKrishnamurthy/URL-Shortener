const mongoose = require('mongoose');
const validator = require('validator');
const shorthash = require('shorthash');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let urlSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        validate:
        {
            validator: function(url){
                return validator.isURL(url);
            },
            message: function(err){
                return 'invalid URL'+ err;
            }
        }
    },
    tags:{
        type: [String],
        required: true
    },
    hashedUrl:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now()
    },
    tokens:[{
        token:{
            type: String
        }
    }]
});

urlSchema.pre('validate', function(next){
    if (this.isNew){
        let url = this.originalUrl;
        this.hashedUrl = shorthash.unique(url);
    }
    next();
});

urlSchema.methods.generateToken = function(next){
    let url = this;
    let tokenData = {
        _id: url._id
    }
    let token  = jwt.sign(tokenData, 'supersecret');
    url.tokens.push({token});
    return url.save().then(()=>{
        return token;
    })
}
let Url  = mongoose.model('Url', urlSchema);
module.exports = {
    Url
}