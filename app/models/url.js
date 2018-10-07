const mongoose = require('mongoose');
const validator = require('validator');
const shorthash = require('shorthash');
const Schema = mongoose.Schema;

const clickSchema = new Schema({
    clickedDateTime: {
        type: Date,
        default:  Date.now()
    },
    ipAddress:{
        type: String
    },
    browserName:{
        type: String
    },
    OSType:{
        type: String
    },
    deviceType: {
        type: String
    }
})

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
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now()
    },
    clicks: [clickSchema]
});
urlSchema.pre('save', function(next){
    let url = this;
    url.hashedUrl = shorthash.unique(url.originalUrl);
    next();
})
let Url  = mongoose.model('Url', urlSchema);
module.exports = {
    Url
}