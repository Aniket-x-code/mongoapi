const express = require("express")
const {ObjectId}=require('mongodb')
const { connectToDb, getDb }= require('./db')
const app = express()

let db;

// db connection
connectToDb((err)=>{
    if(!err)
    {   
    app.listen(3000, ()=>{
    console.log('app listening on port 3000');
    })
    }
        db = getDb()
})

//  routes
app.get('/books', (req, res)=>{
    let books=[]  //array to store books

    db.collection('books')
    // db.books
    .find()  
    .sort({ author: 1})
    .forEach(book=> books.push(book))
    .then(() =>{
        res.status(200).json(books)
    })
    .catch(() =>{
        res.status(500).json({error: 'could not fetch the data'})
    })
  
})

app.get('/books/:id', (req,res)=>{
    if(ObjectId.isValid(req.params.id))
    {
        db.collection('books')
    .findOne({_id: ObjectId(req.params.id)})
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({error: 'could not fetch'})
    })
    }
    else
    {
        res.status(500).json({error: 'not a valid id'})
    }
})