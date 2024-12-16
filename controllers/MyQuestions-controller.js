const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");

const findMyQuestions = async (req, res, next) => {
  try {
    const id = req.id;

    const myQuestionIds = await Question.find({ createdBy: id }, "_id");

    res.status(200).json({
      success: true,
      questionIds: myQuestionIds.map((question) => question._id),
    });
  } catch (error) {
    next(error);
  }
};

const findSubmissions = async (req, res, next) => {
  try {
    const id = req.params.id;

    const question = await Question.findById(id).populate({
      path: "answers",
      populate: { path: "SubmittedBy", select: "name _id" },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const submissions = question.answers.map((answer) => ({
      userId: answer.SubmittedBy._id,
      userName: answer.SubmittedBy.name,
      answerId: answer._id,
    }));

    res.status(200).json({
      submissions,
    });
  } catch (error) {
    next(error);
  }
};

const findAnswerSheet = async (req, res, next) => {
  try {
    const answerId = req.params.id;

    const answer = await Answer.findById(answerId)
      .populate("SubmittedBy", "name username")
      .populate("Question", "question1 question2 question3")
      .exec();

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    console.log({
      answerId: answer._id,
      SubmittedBy: answer.SubmittedBy,
      question: answer.Question,
      answerDetails: answer,
    });
    res.status(200).json({
      answerId: answer._id,
      SubmittedBy: answer.SubmittedBy,
      question: answer.Question,
      answerDetails: answer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findMyQuestions,
  findSubmissions,
  findAnswerSheet,
};
