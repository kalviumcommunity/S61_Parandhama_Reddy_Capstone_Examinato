const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Authentication/AuthRoutes")
const auth = require("./Authentication/auth")

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(`Error in connecting: ${err}`));

app.use("/uploads", express.static("uploads"));
app.use("/api", router);
app.use('/auth', authRoutes);
app.use(auth);

// Serve static files from the client
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

module.exports = app;
