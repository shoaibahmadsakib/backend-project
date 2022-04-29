const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId =require( 'mongodb').ObjectId

app.use(cors());
app.use(express.json());

//welcome message

app.get("/", (req, res) => {
  res.send("hello nodemon hello galo");
});

// mongo db

const uri =
  "mongodb+srv://dbuser1:WU3vJEREHhm4VeZC@cluster0.7corc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");


    app.get('/user',async (req,res)=>{
        const query = {};
        const cursor = userCollection.find(query)
        const users = await cursor.toArray();
        res.send(users);
    })

   app.post('/user',async (req,res)=>{
       const newUser =req.body;
       console.log('adding new user', newUser);
       const result=await  userCollection.insertOne(newUser);
       res.send(result)
   })

  //  update put
  app.put('/user/:id',async (req,res)=>{
    const id =req.params.id;
    const updateUser = req.body;
    const filter ={_id: ObjectId(id)}
    const options ={ upsert:true}
    const updateDoct ={
      $set:{
       name: updateUser.name,
       email: updateUser.email,

      }
    }
    const result = await userCollection.updateOne(filter,updateDoct,options)
    res.send(result)
  })

   app.delete('/user/:id', async(req,res)=>{
       const id = req.params.id;
       const query = { _id :ObjectId(id)}
       const result = await userCollection.deleteOne(query)
       res.send(result)
   })
   //update
   app.get('/user/:id', async(req,res)=>{
       const id = req.params.id;
       const query = { _id :ObjectId(id)}
       const result = await userCollection.findOne(query)
       res.send(result)
   })
  } finally {
  }
}
run().catch(console.dir);



// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const mathed = users.filter((user) =>
//       user.name.toLowerCase().includes(search)
//     );
//     res.send(mathed);
//   } else {
//     res.send(users);
//   }
//   console.log("query", req.query);
// });

// app.get("/user/:id", (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;
//   const user = users.find((u) => u.id === id);
//   res.send(user);
// });

// app.post("/user", (req, res) => {
//   console.log("request", req.body);
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
// });

app.listen(port, () => {
  console.log("port is running", port);
});
