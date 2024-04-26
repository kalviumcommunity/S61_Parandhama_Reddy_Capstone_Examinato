const express = require("express");
require('dotenv').config()
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const port = 8000;

app.use(express.json());

mongoose.connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error(`Error in connecting: ${err}`));

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

module.exports = app;
