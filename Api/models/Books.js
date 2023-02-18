const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    book_id:{
        type:Number
    },
    book_name:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    starRating:{
        type:String,
    },
    ImageUrl:{
        type:String
    },
    tag: {
        type: Array,
        "default" : []
    },
});

const Book = module.exports = mongoose.model('book',BookSchema);