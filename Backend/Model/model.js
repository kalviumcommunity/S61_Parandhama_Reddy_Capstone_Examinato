const mongoose = require('mongoose')
const quizSchema = new mongoose.Schema({
    id: String,
    type: String,
    title: String,
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ]
});

const quizModel = mongoose.model("Quiz", quizSchema);
module.exports = quizModel;
