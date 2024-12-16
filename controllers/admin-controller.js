const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");

const createQuestion1 = async (req, res, next) => {
  try {
    const user = req.user;
    const questionDetails = req.body;

    if (!questionDetails || !Array.isArray(questionDetails)) {
      return res.status(400).json({ msg: "Invalid question details" });
    }

    const newQuestion = new Question({
      question1: questionDetails,
      createdBy: user.id,
    });

    await newQuestion.save();

    res.status(201).json({
      msg: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    next(error);
  }
};

const createQuestion2 = async (req, res, next) => {
  try {
    const { newQuestionId, questions } = req.body;

    if (!newQuestionId || !Array.isArray(questions)) {
      return res.status(400).json({ msg: "Invalid request data" });
    }

    const existingQuestion = await Question.findById(newQuestionId);
    if (!existingQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    }

    existingQuestion.question2.push(...questions);

    await existingQuestion.save();

    res.status(200).json({
      msg: "Questions added successfully",
      updatedQuestion: existingQuestion,
    });
  } catch (error) {
    next(error);
  }
};

const createQuestion3 = async (req, res, next) => {
  try {
    const { newQuestionId, passages } = req.body;

    if (!newQuestionId || !Array.isArray(passages)) {
      return res.status(400).json({ msg: "Invalid request data" });
    }

    const existingQuestion = await Question.findById(newQuestionId);
    if (!existingQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    }

    existingQuestion.question3.push(...passages);

    await existingQuestion.save();

    res.status(200).json({
      msg: "Questions added successfully",
      updatedQuestion: existingQuestion,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuestion1, createQuestion2, createQuestion3 };
