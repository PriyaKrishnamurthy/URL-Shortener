const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/URLShortener-Database', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected to Database');
})
.catch((err)=>{
    console.log(err);
})

module.exports = {
    mongoose
}