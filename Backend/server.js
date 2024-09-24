const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const path = require('path'); // Import the path module
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000; // Use process.env.PORT for deployment
const router = require("./routes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const auth = require("./Authentication/auth");
const authRoute = require("./Authentication/AuthRoutes");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/api", router);
app.use(auth);
app.use("/auth", authRoute);

app.use('/uploads', express.static('uploads'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

module.exports = app;
