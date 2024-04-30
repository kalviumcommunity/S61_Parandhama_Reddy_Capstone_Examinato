const express = require("express");
require('dotenv').config()
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const port = 8000;
const router = require('./routes');

app.use(express.json());

app.get('/get',(req,res)=>{
   res.send("This is get request")
})

app.post('/post',(req,res)=>{
   res.send(req.body)
})

app.put("/put",(req,res)=>{
   res.send("This is put request")
})

mongoose.connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error(`Error in connecting: ${err}`));

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});

app.use('/api', router);

module.exports = app;
