const mongoose = require('mongoose')
const quizSchema = new mongoose.Schema({
    id:Number,
    type:String,
    title:String,
    question:String,
    options:Array,
    correctAnswer:String
})

const quizModel = mongoose.model("data",quizSchema)
module.exports = quizModel