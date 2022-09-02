const express = require("express")
const {ObjectId}=require('mongodb')
const { connectToDb, getDb }= require('./db')

const app = express()
app.use(express.json())
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

app.post('/books', (req,res)=>{
 const book = req.body

 db.collection('books')
 .insertOne(book)
 .then( result=>{
    res.status(200).json(result)
 })
 .catch(err=>{
    res.status(500).json({errpr: 'could not create a new document'})
 })
})
app.delete('/books/:id', (req,res)=>{
    if(ObjectId.isValid(req.params.id))
    {
        db.collection('books')
    .deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({error: 'could not deleet the document'})
    })
    }
    else
    {
        res.status(500).json({error: 'not a valid id'})
    }
})
app.patch('books/:id', (req,res)=>{
  
    const updates = req.body

    if(ObjectId.isValid(req.params.id))
    {
        db.collection('books')
    .updateOne({_id: ObjectId(req.params.id)}, {$set : updates})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json({error: 'could not update the document'})
    })
    }
    else
    {
        res.status(500).json({error: 'not a valid id'})
    }
})