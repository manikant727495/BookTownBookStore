const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
//retrieving data
router.get('/books',(req, res, next)=>{
    Book.find(function(err,books){
        res.json(books);
    });
});
router.get('/books/:id',(req, res, next)=>{
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
router.put('/books/update/:id',(req, res)=>{
        Book.updateOne(
            {_id: req.params.id},
            {$set:{ book_id:req.body.book_id,
                    book_name:req.body.book_name,
                    book_name:req.body.author_name,
                    description:req.body.description,
                    price:req.body.price,
                    starRating:req.body.starRating
                } }
        ).then((result)=>{
            res.status(200).json(result)
        }).catch((err) => {console.warn(err)})
});

//add Book
router.post('/book',(req, res, next)=>{
    let newBook = new Book({
        book_id:req.body.book_id,
        book_name:req.body.book_name,
        author_name:req.body.author_name,
        price:req.body.price,
        description:req.body.description,
        starRating:req.body.starRating,
        ImageUrl:req.body.ImageUrl
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

router.delete('/book/:id',(req, res, next)=>{
    Book.remove({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
        
    });
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