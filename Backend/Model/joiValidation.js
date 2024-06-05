const joi = require('joi')

const questionSchema = joi.object({
    question: joi.string().required(),
    options: joi.array().items(joi.string()).min(2).required(),
    correctAnswer: joi.string().required()
});

const quizSchema = joi.object({
    id: joi.string().required(),
    type: joi.string().required(),
    title: joi.string().required(),
    questions: joi.array().items(questionSchema).required()
});

module.exports = quizSchema;
