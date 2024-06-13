const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  id: Number,
  type: String,
  title: String,
  question: String,
  options: Array,
  correctAnswer: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const quizModel = mongoose.model("data", quizSchema);
module.exports = quizModel;
