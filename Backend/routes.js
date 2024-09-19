const express = require("express");
const router = express.Router();
const QuizModel = require("./Model/model");
const quizSchema = require("./Model/joiValidation");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const authMiddleware = require("./Authentication/authMiddleware");
const multer = require('multer');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/postquiz", authMiddleware, upload.single('image'), async (req, res) => {
  const quizData = req.body;
  if (req.file) {
    quizData.imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const { error } = quizSchema.validate(quizData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "Author ID is missing" });
    }

    quizData.author = req.user.id;

    const quiz = new QuizModel(quizData);
    const savedQuiz = await quiz.save();
    res
      .status(201)
      .json({ message: "Quiz data posted successfully", data: savedQuiz });
  } catch (error) {
    console.error("Error posting the quiz data:", error);
    res.status(500).json({ error: "Unable to post quiz data" });
  }
});

router.get("/getquiz", async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.send(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res
      .status(500)
      .send({ error: "Failed to fetch quizzes", details: err.message });
  }
});

router.put("/updatequiz/:id", authMiddleware, async (req, res) => {
  const quizId = req.params.id;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res
      .status(200)
      .json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (error) {
    console.error(`Error updating quiz: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deletequiz/:id", authMiddleware, async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res
      .status(200)
      .json({ message: "Quiz deleted successfully", quiz: deletedQuiz });
  } catch (error) {
    console.error(`Error deleting quiz: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
