const joi = require('joi')

const quizSchema = joi.object({
    id:joi.number(),
    type:joi.string().required(),
    title:joi.string().required(),
    question:joi.string().required(),
    options: joi.array().items(joi.string()).min(2).required(),
    correctAnswer: joi.string().required(),
    author:joi.string().required()
})

module.exports = quizSchema;