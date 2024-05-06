const mongoose = require('mongoose')
const quizSchema = new mongoose.Schema({
    id:Number,
    type:String,
    title:String,
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String
})

const quizModel = mongoose.model("data",quizSchema)
module.exports = quizModel