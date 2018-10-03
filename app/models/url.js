const mongoose = require('mongoose');
const validator = require('validator');
const shorthash = require('shorthash');
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
    }
});



urlSchema.pre('validate', function(next){
    console.log('in');
    let url = this.originalUrl;
    console.log('i am in', url);
    this.hashedUrl = shorthash.unique(url);
    console.log('i am in', this);
    next();
});
let Url  = mongoose.model('Url', urlSchema);
module.exports = {
    Url
}