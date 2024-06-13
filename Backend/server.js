const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const port = 8000;
const router = require("./routes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const auth = require("./Authentication/auth");
const authRoute = require("./Authentication/AuthRoutes")


app.use(express.json());


app.use(cors());
app.use(cookieParser());

mongoose.connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error(`Error in connecting: ${err}`));

app.get("/recieve", (req, res) => {
  res.send("This is get request");
});

app.post("/send", (req, res) => {
  res.send(req.body);
});

app.put("/update", (req, res) => {
  res.send("this is put request");
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

app.use("/api", router);
app.use(auth);
app.use("/auth", authRoute);


module.exports = app;
