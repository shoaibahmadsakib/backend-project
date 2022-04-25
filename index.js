const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
   
  res.send("hello nodemon hello galo");
});

const users = [
  { id: 1, name: "sabana mam", email: "sabana@gmail.com", phone: "017883923" },
  { id: 2, name: "kabana mam", email: "kabana@gmail.com", phone: "017883923" },
  { id: 3, name: "habana mam", email: "habana@gmail.com", phone: "017883923" },
  { id: 4, name: "jabana mam", email: "jabana@gmail.com", phone: "017883923" },
  { id: 5, name: "pabana mam", email: "pabana@gmail.com", phone: "017883923" },
];

app.get("/users", (req, res) => {
    if(req.query.name){
        const search = req.query.name;
        const mathed = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(mathed)
    }
    else{
        res.send(users);
    }
    console.log("query",req.query)
 
});

app.get('/user/:id' , (req,res)=>{
    console.log(req.params);
    const id=req.params.id;
    const user = users.find( u=> u.id === id)
    res.send(user)
})


app.post('/user', (req,res) =>{
    console.log( 'request',req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
 
})


app.listen(port, () => {
  console.log("port is running", port);
});
