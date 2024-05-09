const express = require("express");
const router = express.Router();
const QuizModel = require("./Model/model");
const quizSchema = require("./Model/joiValidation")

router.post("/postquiz", async (req, res) => {
  const quizData = req.body;

  try {
    const { error } = quizSchema.validate(quizData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const quiz = new QuizModel(quizData);
    const savedQuiz = await quiz.save();
    res.status(201).json({ message: "Quiz data posted successfully", data: savedQuiz });
  } catch (error) {
    console.error("Error posting in the quiz data:", error);
    res.status(500).json({ error: "Unable to post quiz data" });
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
  const { error } = quizSchema.validate(updateQuizData);
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

router.delete("/deletequiz/:id", async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await QuizModel.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).send("Quiz not found");
    }
    res.status(200).json({ message: "Quiz deleted successfully", deletedQuiz });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
