const express=require('express');
const app = express();
const cors=require('cors');
require('dotenv').config();
const {MongoClient}=require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port=process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());


//connecting server to mongo db
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.byzxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run(){

     try{

         //making connection with database

     await client.connect();
     console.log('database connected');
        //creating database and collections
     const database = client.db('Portfolios');
     const ProjectCollection = database.collection('Projects');

     ///////////////////////
     //getting all Projects
     app.get('/allprojects',async (req,res) => {
        const cursor =ProjectCollection.find({});
        const projects=await cursor.toArray();
        res.send(projects);
    });
 
  
       //getting project with dynamic id
       app.get('/projects/:id',async (req,res) => {
           const id=req.params.id;
           const query={_id:ObjectId(id)};
           const project=await ProjectCollection.findOne(query);
           res.send(project);
       });

    



     }
     finally {
         
     }




}



run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Portfolio server is running');
});


app.listen(port,()=>{
    console.log('server in listening on port '+port);
});
