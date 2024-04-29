const express = require("express");
const router = express.Router();
const QuizModel = require("./Model/model");

router.post("/postquiz", async (req, res) => {
  try {
    const quiz = new QuizModel(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getquiz", async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.send(quizzes);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/updatequiz/:id", async (req, res) => {
  const quizId = req.params.id;
  const updateQuizData = req.body;
  const { error } = QuizModel.validate(updateQuizData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      quizId,
      updateQuizData,
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).send("Quiz not found");
    }
    res.send(updatedQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
