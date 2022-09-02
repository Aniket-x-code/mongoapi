const { MongoClient } = require('mongodb')
let dbConnection

let uri= 'mongodb+srv://aniket:aniket123@cluster0.ggb9fc5.mongodb.net/?retryWrites=true&w=majority'
module.exports={
    connectToDb: (cb)=>{
        MongoClient.connect(uri)
        .then((client)=>{
          dbConnection = client.db()
          return cb()
        })
        .catch(err=>{
            console.log(err);
            return cb(err)
        })
    },
    getDb:()=> dbConnection
}