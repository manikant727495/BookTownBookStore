const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const fetchuser = require('../middleware/fetchuser');
//retrieving data
router.get('/books',(req, res, next)=>{
    Book.find(function(err,books){
        res.json(books);
    });
});

router.get('/books/:id',fetchuser,(req, res, next)=>{
    Book.findOne({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
        
    });
});

router.put('/update/:id',(req, res)=>{
        Book.updateOne(
            {_id: req.params.id},
            {$set:{ book_id:req.body.book_id,
                    book_name:req.body.book_name,
                    author_name:req.body.author_name,
                    description:req.body.description,
                    price:req.body.price,
                    starRating:req.body.starRating,
                    tag: req.body.tag
                } }
        ).then((result)=>{
            res.status(200).json(result)
        }).catch((err) => {console.warn(err)})
});

//add Book
router.post('/addbook',(req, res, next)=>{
    let newBook = new Book({
        book_name:req.body.book_name,
        author_name:req.body.author_name,
        price:req.body.price,
        description:req.body.description,
        starRating:req.body.starRating,
        ImageUrl:req.body.ImageUrl,
        tag: req.body.tag
    })
    newBook.save((err,book)=>{
        if(err)
        {
            res.json({err:'failed to add book'});
        }
        else{
            res.json({msg:'Book added successfully'});
        }
    });
  });

//delete Book
router.delete('/deletebook/:id',(req, res, next)=>{
    Book.deleteOne({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
        
    });
});

router.post('/autocomplete/',async (req, res, next)=>{
    let searchedText = req.body.searchedText;
    let regex = new RegExp(searchedText,'i');
    let autocompleteTags = [];
    let findBoooName = await Book.find({book_name:regex});
    let findAuthorName = await Book.find({author_name:regex});
    let findTags = await Book.find({tag:regex});

    findBoooName.forEach(element => {
        autocompleteTags.push(element.book_name);
    });

    findAuthorName.forEach(element => {
        if(!autocompleteTags.includes(element.author_name)){
            autocompleteTags.push(element.book_name);
        }
    });
    findTags.forEach(element => {
        element.tag.forEach(ele=>{
            if(regex.test(ele)){
                if(!autocompleteTags.includes(ele)){
                    autocompleteTags.push(ele);
                }
            }
        })
    });
    res.json(autocompleteTags);
});

router.get('/search/:searchedText',async (req, res, next)=>{
    let searchedText = req.params.searchedText;
    let regex = new RegExp(searchedText,'i');
    let searchedResults = [];
    let findBooksByTitle = await Book.find({book_name:regex});
    let findBooksByAuthorName = await Book.find({author_name:regex});
    let findBooksByTag = await Book.find({tag:regex});
    findBooksByTitle.forEach(element => {
        searchedResults.push(element);
    });
    findBooksByAuthorName.forEach(element => {
        if(!searchedResults.includes(element)){
            searchedResults.push(element);
        }
    });
    findBooksByTag.forEach(element => {
        if(!searchedResults.includes(element)){
            searchedResults.push(element);
        }
    });
    res.json(searchedResults);
});

module.exports = router;
/*
V   "_id": "616715465c379b00442f33dc",
        "book_name": "seven habbit of highly effective people",
            {
        "_id": "61673f4f5c379b00442f3424",
        "book_name": "The three mistakes of my life",
        "author_name": "chetan bhagat",
        "price": "167",
        "description": "The 3 Mistakes of My Life is the third novel written by Chetan Bhagat. The book was published in May 2008 and had an initial print-run of 420,000.",
        "starRating": "4.7",
        "ImageUrl": "assets/images/three.jpeg",
        "__v": 0
    },
*/